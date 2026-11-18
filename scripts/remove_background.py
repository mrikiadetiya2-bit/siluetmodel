#!/usr/bin/env python3
"""
AI Automatic Background Remover for Siluet Model Tala (Virtual Runway)
Uses rembg with U2Net model to produce clean, full-resolution transparent PNG cutouts.
"""

import argparse
import json
import sys
from pathlib import Path
from typing import NoReturn


def emit_error(message: str, code: int = 1) -> NoReturn:
    sys.stderr.write(json.dumps({"success": False, "error": message}) + "\n")
    sys.exit(code)


def main() -> None:
    parser = argparse.ArgumentParser(description="Remove image background using rembg U2Net.")
    parser.add_argument("--input", required=True, help="Path to source image file")
    parser.add_argument("--output", required=True, help="Path to output transparent PNG file")
    parser.add_argument("--model", default="u2net", help="rembg model name (default: u2net)")
    parser.add_argument(
        "--alpha-matting",
        action="store_true",
        help="Enable alpha matting for fine hair/edge refinement (slower on CPU)",
    )
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    if not input_path.is_file():
        emit_error("Input image file not found.")

    try:
        from PIL import Image, ImageOps
        from rembg import new_session, remove
    except ImportError as exc:
        emit_error(f"Required Python dependency is missing: {exc}")

    try:
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Open original image and normalize EXIF orientation without cropping or altering colors
        with Image.open(input_path) as raw_img:
            oriented = ImageOps.exif_transpose(raw_img)
            # Preserve RGB/RGBA fidelity at original resolution
            source_img = oriented.convert("RGBA") if oriented.mode in ("RGBA", "LA", "P") else oriented.convert("RGB")

        session = new_session(args.model)

        if args.alpha_matting:
            raw_result = remove(
                source_img,
                session=session,
                post_process_mask=False,
                alpha_matting=True,
                alpha_matting_foreground_threshold=240,
                alpha_matting_background_threshold=15,
                alpha_matting_erode_size=8,
            )
        else:
            raw_result = remove(
                source_img,
                session=session,
                post_process_mask=False,
            )

        if not isinstance(raw_result, Image.Image):
            emit_error("Unexpected image output format from rembg.")

        result_img: Image.Image = raw_result if raw_result.mode == "RGBA" else raw_result.convert("RGBA")

        # Clean very faint background residue (alpha < 12 -> 0) while preserving
        # smooth anti-aliased edges on hair, face, and clothing without altering RGB colors
        import numpy as np

        rgba = np.array(result_img, copy=True)
        alpha = rgba[:, :, 3]
        rgba[alpha < 12, 3] = 0
        # Zero RGB on fully transparent pixels for smaller PNG size and zero fringe halo
        rgba[rgba[:, :, 3] == 0, :3] = 0
        result_img = Image.fromarray(rgba, mode="RGBA")

        # Save lossless transparent PNG preserving full resolution
        result_img.save(output_path, format="PNG", optimize=True)
        width, height = result_img.size

        sys.stdout.write(
            json.dumps(
                {
                    "success": True,
                    "width": width,
                    "height": height,
                    "model": args.model,
                    "output": str(output_path),
                }
            )
            + "\n"
        )
    except Exception as exc:
        emit_error(f"Background removal failed: {exc}")


if __name__ == "__main__":
    main()
