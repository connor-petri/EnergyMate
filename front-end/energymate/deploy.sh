echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* orangepi@67.148.60.86:/var/www/192.168.0.13/

echo "Done!"

