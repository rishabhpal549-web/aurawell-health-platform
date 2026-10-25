# AuraWell LAN Server - Accessible on any phone on same Wi-Fi
$port = 8080
$ip = [System.Net.IPAddress]::Any
$listener = New-Object System.Net.Sockets.TcpListener($ip, $port)

try {
    $listener.Start()
    Write-Host "AuraWell LAN Server running on port $port"
} catch {
    Write-Host "Could not bind LAN socket: $($_.Exception.Message)"
}
