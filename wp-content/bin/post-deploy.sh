#!/bin/sh

echo "Starting post deploy script..."
echo "Switch directory to wp-content/futures-readiness"
cd wp-content/themes/futures-readiness
echo "Installing Composer dependencies..."
composer install --no-dev --no-progress