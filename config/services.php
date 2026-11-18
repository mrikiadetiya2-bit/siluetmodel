<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'rembg' => [
        'python_path' => env('REMBG_PYTHON_PATH'),
        'script_path' => base_path('scripts/remove_background.py'),
        'model' => env('REMBG_MODEL', 'u2net'),
        'cache_dir' => env('REMBG_CACHE_DIR', storage_path('app/rembg-models')),
        'timeout' => (int) env('REMBG_TIMEOUT', 120),
        'alpha_matting' => filter_var(env('REMBG_ALPHA_MATTING', false), FILTER_VALIDATE_BOOL),
        'max_upload_kb' => (int) env('REMBG_MAX_UPLOAD_KB', 5120),
    ],

];
