Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
$Root = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")

function New-DirectoryForFile {
  param([string]$Path)

  $directory = Split-Path -Parent $Path
  if (-not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
  }
}

function Save-StandardImage {
  param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$Destination,
    [Parameter(Mandatory = $true)][int]$Width,
    [Parameter(Mandatory = $true)][int]$Height,
    [ValidateSet("contain", "cover")][string]$Mode = "contain",
    [ValidateSet("transparent", "white")][string]$Background = "transparent"
  )

  $sourcePath = Join-Path $Root $Source
  $destinationPath = Join-Path $Root $Destination

  if (-not (Test-Path -LiteralPath $sourcePath)) {
    Write-Warning "Missing source: $Source"
    return
  }

  New-DirectoryForFile -Path $destinationPath

  $sourceImage = [System.Drawing.Image]::FromFile($sourcePath)
  $bitmap = New-Object System.Drawing.Bitmap $Width, $Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

  try {
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    if ($Background -eq "white") {
      $graphics.Clear([System.Drawing.Color]::White)
    } else {
      $graphics.Clear([System.Drawing.Color]::Transparent)
    }

    $scaleX = $Width / $sourceImage.Width
    $scaleY = $Height / $sourceImage.Height
    if ($Mode -eq "cover") {
      $scale = [Math]::Max($scaleX, $scaleY)
    } else {
      $scale = [Math]::Min($scaleX, $scaleY)
    }

    $drawWidth = [single]($sourceImage.Width * $scale)
    $drawHeight = [single]($sourceImage.Height * $scale)
    $drawX = [single](($Width - $drawWidth) / 2)
    $drawY = [single](($Height - $drawHeight) / 2)
    $rectangle = New-Object System.Drawing.RectangleF $drawX, $drawY, $drawWidth, $drawHeight
    $graphics.DrawImage($sourceImage, $rectangle)

    if ([IO.Path]::GetExtension($destinationPath).ToLowerInvariant() -in @(".jpg", ".jpeg")) {
      $bitmap.Save($destinationPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    } else {
      $bitmap.Save($destinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }

    Write-Output "$Destination"
  } finally {
    $graphics.Dispose()
    $bitmap.Dispose()
    $sourceImage.Dispose()
  }
}

$productCards = @(
  @{ Source = "public/images/products/rexy/rexy-product-card.png"; Destination = "public/images/standardized/product-cards/baby-rexy.png" },
  @{ Source = "public/images/products/HQ/rexy-product-card.png"; Destination = "public/images/standardized/product-cards/hq-plus.png" },
  @{ Source = "public/images/products/tizkar/product-card.png"; Destination = "public/images/standardized/product-cards/tizkar.png" },
  @{ Source = "public/images/products/fantash-product-v2.png"; Destination = "public/images/standardized/product-cards/fantash.png" },
  @{ Source = "public/images/products/Bino & Avia/Bino-S.png"; Destination = "public/images/standardized/product-cards/bino-tex.png" },
  @{ Source = "public/images/products/Bino & Avia/Avia-S.png"; Destination = "public/images/standardized/product-cards/avia.png" }
)

$productOptions = @(
  @{ Source = "public/images/products/rexy/NB.png"; Destination = "public/images/standardized/product-options/rexy-nb.png" },
  @{ Source = "public/images/products/rexy/S.png"; Destination = "public/images/standardized/product-options/rexy-s.png" },
  @{ Source = "public/images/products/rexy/M.png"; Destination = "public/images/standardized/product-options/rexy-m.png" },
  @{ Source = "public/images/products/rexy/L.png"; Destination = "public/images/standardized/product-options/rexy-l.png" },
  @{ Source = "public/images/products/rexy/XL.png"; Destination = "public/images/standardized/product-options/rexy-xl.png" },
  @{ Source = "public/images/products/rexy/XXL.png"; Destination = "public/images/standardized/product-options/rexy-xxl.png" },
  @{ Source = "public/images/products/HQ/NORMAL.png"; Destination = "public/images/standardized/product-options/hq-normal.png" },
  @{ Source = "public/images/products/HQ/SUPER.png"; Destination = "public/images/standardized/product-options/hq-super.png" },
  @{ Source = "public/images/products/HQ/SUPER-PLUS.png"; Destination = "public/images/standardized/product-options/hq-super-plus.png" },
  @{ Source = "public/images/products/HQ/GOODNIGHT.png"; Destination = "public/images/standardized/product-options/hq-goodnight.png" },
  @{ Source = "public/images/products/tizkar/facial.png"; Destination = "public/images/standardized/product-options/tizkar-facial.png" },
  @{ Source = "public/images/products/tizkar/drying .png"; Destination = "public/images/standardized/product-options/tizkar-drying.png" },
  @{ Source = "public/images/products/Bino & Avia/Bino-S.png"; Destination = "public/images/standardized/product-options/bino-s.png" },
  @{ Source = "public/images/products/Bino & Avia/Bino-L.png"; Destination = "public/images/standardized/product-options/bino-l.png" },
  @{ Source = "public/images/products/Bino & Avia/Bino-XL.png"; Destination = "public/images/standardized/product-options/bino-xl.png" },
  @{ Source = "public/images/products/Bino & Avia/Avia-S.png"; Destination = "public/images/standardized/product-options/avia-s.png" },
  @{ Source = "public/images/products/Bino & Avia/Avia-L.png"; Destination = "public/images/standardized/product-options/avia-l.png" },
  @{ Source = "public/images/products/Bino & Avia/Avia-XL.png"; Destination = "public/images/standardized/product-options/avia-xl.png" }
)

$banners = @(
  @{ Source = "public/images/products/rexy/rexy-banner-2.png"; Destination = "public/images/standardized/banners/baby-rexy.png" },
  @{ Source = "public/images/products/HQ/hq-banner.png"; Destination = "public/images/standardized/banners/hq-plus.png" },
  @{ Source = "public/images/products/tizkar/rexy-banner.png"; Destination = "public/images/standardized/banners/tizkar.png" },
  @{ Source = "public/images/products/fantash/fantash-banner.png"; Destination = "public/images/standardized/banners/fantash.png" },
  @{ Source = "public/images/products/Bino & Avia/avia-bino-banner.png"; Destination = "public/images/standardized/banners/adult-care.png" }
)

$heroes = @(
  @{ Source = "public/people/Hero/Hero-1.png"; Destination = "public/images/standardized/hero/hero-1.jpg" },
  @{ Source = "public/people/Hero/Hero-2.png"; Destination = "public/images/standardized/hero/hero-2.jpg" },
  @{ Source = "public/people/Hero/Hero-3.png"; Destination = "public/images/standardized/hero/hero-3.jpg" }
)

$logos = @(
  @{ Source = "public/images/brands/drc-logo-transparent-cropped.png"; Destination = "public/images/standardized/logos/drc-group.png" },
  @{ Source = "public/images/brands/rexy-logo.png"; Destination = "public/images/standardized/logos/rexy.png" },
  @{ Source = "public/images/brands/hq-logo.png"; Destination = "public/images/standardized/logos/hq-plus.png" },
  @{ Source = "public/images/brands/tizkar-logo-updated.png"; Destination = "public/images/standardized/logos/tizkar.png" },
  @{ Source = "public/images/brands/fantash-logo.png"; Destination = "public/images/standardized/logos/fantash.png" },
  @{ Source = "public/images/brands/bino-logo.png"; Destination = "public/images/standardized/logos/bino.png" },
  @{ Source = "public/images/brands/avia-logo.png"; Destination = "public/images/standardized/logos/avia.png" }
)

foreach ($item in $productCards) {
  Save-StandardImage -Source $item.Source -Destination $item.Destination -Width 1600 -Height 1600 -Mode contain -Background transparent
}

foreach ($item in $productOptions) {
  Save-StandardImage -Source $item.Source -Destination $item.Destination -Width 1600 -Height 1600 -Mode contain -Background transparent
}

foreach ($item in $banners) {
  Save-StandardImage -Source $item.Source -Destination $item.Destination -Width 2400 -Height 460 -Mode contain -Background transparent
}

foreach ($item in $heroes) {
  Save-StandardImage -Source $item.Source -Destination $item.Destination -Width 2400 -Height 1500 -Mode cover -Background white
}

foreach ($item in $logos) {
  Save-StandardImage -Source $item.Source -Destination $item.Destination -Width 800 -Height 400 -Mode contain -Background transparent
}
