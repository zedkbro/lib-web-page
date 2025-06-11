# === deploy.ps1 ===

$localPath = "C:\Users\Adoniash\dev\lib-web-page"
$remoteUser = "digibot"
$remoteHost = "10.1.7.4"
$remotePath = "/home/digibot/lib-web-page"

Write-Host "Uploading project files to $remoteUser@$remoteHost..."
scp -r "$localPath" "$remoteUser@$remoteHost:/home/digibot/"

Write-Host "Connecting to remote server and starting Docker..."
ssh "$remoteUser@$remoteHost" "cd $remotePath && docker-compose up -d --build"
