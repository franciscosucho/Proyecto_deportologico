#Set-ExecutionPolicy -ExecutionPolicy Unrestricted
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
New-SmbMapping -RemotePath '\\fileserver' -Username "storage" -Password "cerri3966"

copy \\fileserver\storage\GLPI-inventory-agents\GLPI-agent-x64.msi c:\Users\Alumnos\Downloads\GLPI-agent-x64.msi
#copy \\fileserver\storage\chocoinstall.ps1 c:\Users\Alumnos\Downloads\chocoinstall.ps1
copy \\fileserver\storage\fondo.jpg c:\Users\Alumnos\Downloads\fondo.jpg
#copy '\\fileserver\storage\theftdeterrent\Theft Derrent Agent.exe' c:\Users\Alumnos\Downloads\thf.exe
#copy \\fileserver\storage\FullPack\tightvnc-2.8.63-gpl-setup-64bit.msi C:\Users\Alumnos\Downloads\tightvnc-2.8.63-gpl-setup-64bit.msi


Function Set-WallPaper {
 
<#
 
    .SYNOPSIS
    Applies a specified wallpaper to the current user's desktop
    
    .PARAMETER Image
    Provide the exact path to the image
 
    .PARAMETER Style
    Provide wallpaper style (Example: Fill, Fit, Stretch, Tile, Center, or Span)
  
    .EXAMPLE
    Set-WallPaper -Image "C:\Wallpaper\Default.jpg"
    Set-WallPaper -Image "C:\Wallpaper\Background.jpg" -Style Fit
  
#>
 
param (
    [parameter(Mandatory=$True)]
    # Provide path to image
    [string]$Image,
    # Provide wallpaper style that you would like applied
    [parameter(Mandatory=$False)]
    [ValidateSet('Fill', 'Fit', 'Stretch', 'Tile', 'Center', 'Span')]
    [string]$Style
)
 
$WallpaperStyle = Switch ($Style) {
  
    "Fill" {"10"}
    "Fit" {"6"}
    "Stretch" {"2"}
    "Tile" {"0"}
    "Center" {"0"}
    "Span" {"22"}
  
}
 
If($Style -eq "Tile") {
 
    New-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name WallpaperStyle -PropertyType String -Value $WallpaperStyle -Force
    New-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name TileWallpaper -PropertyType String -Value 1 -Force
 
}
Else {
 
    New-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name WallpaperStyle -PropertyType String -Value $WallpaperStyle -Force
    New-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name TileWallpaper -PropertyType String -Value 0 -Force
 
}
 
Add-Type -TypeDefinition @" 
using System; 
using System.Runtime.InteropServices;
  
public class Params
{ 
    [DllImport("User32.dll",CharSet=CharSet.Unicode)] 
    public static extern int SystemParametersInfo (Int32 uAction, 
                                                   Int32 uParam, 
                                                   String lpvParam, 
                                                   Int32 fuWinIni);
}
"@ 
  
    $SPI_SETDESKWALLPAPER = 0x0014
    $UpdateIniFile = 0x01
    $SendChangeEvent = 0x02
  
    $fWinIni = $UpdateIniFile -bor $SendChangeEvent
  
    $ret = [Params]::SystemParametersInfo($SPI_SETDESKWALLPAPER, 0, $Image, $fWinIni)
}
 
Set-WallPaper -Image "c:\Users\Alumnos\Downloads\fondo.jpg" -Style Stretch
(Get-Item -Path "c:\Users\Alumnos\Downloads\fondo.jpg" -Force).Attributes +="Hidden"
Set-ItemProperty -Path "c:\Users\Alumnos\Downloads\fondo.jpg" -Name IsReadOnly -Value $true
choco install googlechrome vscode python vlc maxima tightvnc libreoffice xampp virtualbox -y
