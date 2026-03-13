$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$tmpDir = Join-Path $root "tmp"
$sigilDir = Join-Path $root "public\\assets\\sigils"
$portraitDir = Join-Path $root "public\\assets\\portraits"
$dataDir = Join-Path $root "src\\data"
$sourceFile = Join-Path $tmpDir "goetia-source.html"
$sourceUrl = "https://www.esotericarchives.com/solomon/goetia.htm"

New-Item -ItemType Directory -Force -Path $tmpDir, $sigilDir, $portraitDir, $dataDir | Out-Null

if (-not (Test-Path $sourceFile)) {
  curl.exe -k -s -L -A "Mozilla/5.0" $sourceUrl -o $sourceFile
}

$manifestText = @'
1|baal|Bael|Bael,Baal
2|agares|Agares|Agares
3|vassago|Vassago|Vassago
4|gamigin|Samigina|Samigina,Gamigin
5|marbas|Marbas|Marbas,Barbas
6|valefar|Valefor|Valefor,Valefar
7|amon|Amon|Amon
8|barbatos|Barbatos|Barbatos
9|paimon|Paimon|Paimon
10|buer|Buer|Buer
11|gusoin|Gusion|Gusion,Gusoin
12|sitri|Sitri|Sitri,Bitru
13|beleth|Beleth|Beleth,Bilet,Bileth
14|leraye|Leraje|Leraje,Leraie,Leraye
15|eligor|Eligos|Eligos,Eligor,Abigor
16|zepar|Zepar|Zepar
17|botis|Botis|Botis
18|bathin|Bathin|Bathin,Bathym,Bathim
19|saleos|Sallos|Sallos,Saleos,Zaleos
20|purson|Purson|Purson,Curson
21|morax|Morax|Morax,Foraii,Marax
22|ipos|Ipos|Ipos,Ipes
23|aim|Aim|Aim,Aym,Haborym
24|naberius|Naberius|Naberius,Cerberus
25|glasyalabolas|Glasya-Labolas|Glasya-Labolas,Caacrinolaas,Glasyalabolas
26|bune|Bune|Bune,Bim,Bime
27|ronove|Ronove|Ronove,Ronoveh
28|berith|Berith|Berith,Beale,Bolfry
29|astaroth|Astaroth|Astaroth
30|forneus|Forneus|Forneus
31|foras|Foras|Foras,Forras
32|asmoday|Asmoday|Asmoday,Asmodeus
33|gaap|Gaap|Gaap,Tap
34|furtur|Furfur|Furfur,Furtur
35|marchosias|Marchosias|Marchosias,Marchocias
36|stolas|Stolas|Stolas,Stolos
37|phoenix|Phenex|Phenex,Phoenix
38|halphas|Halphas|Halphas,Malthus
39|malphas|Malphas|Malphas
40|raum|Raum|Raum
41|focalor|Focalor|Focalor,Forcalor
42|vepar|Vepar|Vepar,Separ
43|sabnach|Sabnock|Sabnock,Sabnach
44|shax|Shax|Shax,Chax,Shass
45|vine|Vine|Vine
46|bifrons|Bifrons|Bifrons,Bifrovs
47|vual|Vual|Vual,Uvall,Voval,Vreal
48|haagenti|Haagenti|Haagenti,Haagenthi
49|procel|Crocell|Crocell,Procel,Procell
50|furcas|Furcas|Furcas
51|balam|Balam|Balam,Balaam
52|alloces|Alloces|Alloces,Allocer
53|caim|Caim|Caim,Camio
54|murmur|Murmur|Murmur,Murmus
55|orobas|Orobas|Orobas
56|gemory|Gremory|Gremory,Gamori,Gemory
57|ose|Ose|Ose,Oso,Osé
58|amy|Amy|Amy,Avnas
59|orias|Orias|Orias,Oriax
60|vapula|Vapula|Vapula,Naphula
61|zagan|Zagan|Zagan
62|valac|Valac|Valac,Ualac,Volac,Valak
63|andras|Andras|Andras
64|flauros|Flauros|Flauros,Haures,Hauras,Havres
65|andrealphus|Andrealphus|Andrealphus
66|cimeies|Cimeies|Cimeies,Cimejes,Kimaris
67|amduscias|Amdusias|Amdusias,Amduscias
68|belial|Belial|Belial
69|decarabia|Decarabia|Decarabia
70|seere|Seere|Seere,Sear,Seir
71|dantalion|Dantalion|Dantalion
72|andromalius|Andromalius|Andromalius
'@

function Get-CleanText {
  param([string]$Html)
  $decoded = [System.Net.WebUtility]::HtmlDecode($Html)
  $decoded = $decoded -replace '<sup[^>]*>.*?</sup>', ''
  $decoded = $decoded -replace '<br\s*/?>', ' '
  $decoded = $decoded -replace '<[^>]+>', ' '
  $decoded = $decoded -replace '\[[^\]]+\]', ''
  $decoded = $decoded -replace '\s+', ' '
  return $decoded.Trim()
}

function Extract-Rank {
  param([string]$Text)
  $matches = [regex]::Matches($Text, '\b(King|Prince|Duke|Marquis|President|Earl|Knight)\b', 'IgnoreCase')
  if ($matches.Count -eq 0) {
    return "Spirit"
  }

  $ordered = @()
  foreach ($match in $matches) {
    $value = (Get-Culture).TextInfo.ToTitleCase($match.Value.ToLowerInvariant())
    if ($ordered -notcontains $value) {
      $ordered += $value
    }
  }
  return ($ordered -join " and ")
}

function Extract-Legions {
  param([string]$Text)
  $match = [regex]::Match($Text, '(\d+)\s+Legions', 'IgnoreCase')
  if ($match.Success) {
    return [int]$match.Groups[1].Value
  }
  return $null
}

function Extract-Appearance {
  param([string]$Text)
  $patterns = @(
    'appeareth(?<body>.*?)(?=\bhe\b|, he |, and he | governeth | ruleth | commandeth |$)',
    'appeareth at first(?<body>.*?)(?=\bhe\b|, he | governeth | ruleth |$)',
    'appereth(?<body>.*?)(?=\bhe\b|, he | governeth | ruleth |$)',
    'appears(?<body>.*?)(?=\bhe\b|, he | governeth | ruleth |$)',
    'cometh up(?<body>.*?)(?=\bhe\b|, he | governeth | ruleth |$)'
  )

  foreach ($pattern in $patterns) {
    $match = [regex]::Match($Text, $pattern, 'IgnoreCase')
    if ($match.Success) {
      $body = $match.Groups["body"].Value.Trim(" ,.;:-")
      if ($body.Length -gt 0) {
        return $body
      }
    }
  }
  return ""
}

function Normalize-Clause {
  param([string]$Clause)
  $clean = $Clause.Trim(" ,.;:-")
  $clean = $clean -replace '^\b(and|he|his office is|this spirit)\b\s*', ''
  $clean = $clean -replace '\s+', ' '
  if ($clean.Length -gt 1) {
    return ($clean.Substring(0, 1).ToUpper() + $clean.Substring(1))
  }
  return $clean
}

function Extract-Offices {
  param([string]$Text, [string]$Appearance)
  $working = $Text
  if ($Appearance) {
    $working = $working -replace [regex]::Escape($Appearance), ''
  }
  $working = $working -replace '^The .*?(?= he |\bhe can\b|\bhe maketh\b|\bhe giveth\b|\bhe causeth\b|\bhe telleth\b|\bhe knoweth\b|\bhe discovereth\b)', ''
  $working = $working -replace 'This is his seal.*$', ''
  $working = $working -replace 'his seal.*$', ''
  $working = $working -replace 'This is his Character.*$', ''
  $working = $working -replace 'and hath \d+ Legions.*$', ''
  $working = $working -replace 'he hath under his government \d+ Legions.*$', ''
  $working = $working -replace 'he governeth \d+ Legions.*$', ''
  $working = $working -replace 'he ruleth over \d+ Legions.*$', ''
  $working = $working -replace 'he ruleth \d+ Legions.*$', ''
  $working = $working -replace 'he commandeth \d+ Legions.*$', ''
  $working = $working -replace 'he governeth over \d+ Legions.*$', ''
  $working = $working -replace 'he hath under his command \d+ Legions.*$', ''
  $working = $working -replace 'he hath under him \d+ Legions.*$', ''
  $working = $working -replace 'This spirit is of a good nature,?\s*', ''
  $interesting = @()
  $matches = [regex]::Matches(
    $working,
    '\b(maketh|fetcheth|teacheth|teach|declare|discover|bringeth|bring|procureth|cause|causeth|cureth|giveth|give|telleth|tell|answereth|answers|knoweth|showeth|findeth|restoreth|changeth|turneth|understanding|wisdome|wisdom|hath power also to)\b[^.;]+',
    'IgnoreCase'
  )
  foreach ($match in $matches) {
    $normalized = Normalize-Clause $match.Value
    if ($normalized.Length -ge 8 -and $interesting -notcontains $normalized) {
      $interesting += $normalized
    }
  }
  return @($interesting | Select-Object -First 6)
}

function Build-Tags {
  param([string[]]$Offices, [string]$Appearance, [string]$Rank)
  $text = (($Offices -join " ") + " " + $Appearance + " " + $Rank).ToLowerInvariant()
  $tags = New-Object System.Collections.Generic.List[string]
  $tagMap = [ordered]@{
    divination = 'past|to come|future|hidden|secret|discover'
    languages = 'language|tongue'
    love = 'love'
    reconciliation = 'reconcile|friends|foes|controvers'
    invisibility = 'invisible'
    healing = 'cure|heal|desease|disease'
    transformation = 'change|shapes|shape'
    arts = 'arts|science|siences|mechanic'
    treasure = 'treasure|hidden things|lost'
    familiars = 'familiar'
    music = 'music|instrument|singing'
    necromancy = 'dead soules|dead souls'
    animals = 'lion|horse|dog|wolf|bird|serpent|crocodill|camel|bull|cat|toad'
    water = 'sea|water'
    warfare = 'battle|war|weapon'
    nobility = 'king|prince|duke|earl'
  }
  foreach ($pair in $tagMap.GetEnumerator()) {
    if ($text -match $pair.Value) {
      $tags.Add($pair.Key)
    }
  }
  return $tags.ToArray()
}

function Get-SeedValue {
  param([string]$Name)
  $sum = 0
  foreach ($char in $Name.ToCharArray()) {
    $sum += [int][char]$char
  }
  return $sum
}

function Get-Palette {
  param([string]$Rank, [string]$Appearance, [string]$Name)
  $seed = Get-SeedValue $Name
  $rankKey = $Rank.ToLowerInvariant()
  $appearanceKey = $Appearance.ToLowerInvariant()
  $skin = "#a08f74"
  $robe = "#67534e"
  $accent = "#d4b36d"
  $glow = "#8fd7b5"
  $bg = "#09110f"

  if ($rankKey -match 'king') {
    $robe = "#7e1e24"
    $accent = "#e4b15a"
  } elseif ($rankKey -match 'prince') {
    $robe = "#4c326e"
    $accent = "#d4c06d"
  } elseif ($rankKey -match 'duke') {
    $robe = "#38495f"
    $accent = "#c9c8d9"
  } elseif ($rankKey -match 'marquis') {
    $robe = "#5d4730"
    $accent = "#e38f5b"
  } elseif ($rankKey -match 'president') {
    $robe = "#3d5a44"
    $accent = "#9ed6a8"
  } elseif ($rankKey -match 'earl') {
    $robe = "#53556d"
    $accent = "#cf8b64"
  }

  if ($appearanceKey -match 'fire|flame') {
    $accent = "#ff7d45"
    $glow = "#ffb267"
  } elseif ($appearanceKey -match 'water|sea') {
    $accent = "#6fa8dc"
    $glow = "#8dd0ff"
  } elseif ($appearanceKey -match 'lion|wolf|dog') {
    $skin = "#9a7749"
  } elseif ($appearanceKey -match 'bird|raven|griffin|phoenix') {
    $skin = "#7a7267"
  } elseif ($appearanceKey -match 'cat|toad|serpent') {
    $skin = "#768265"
  }

  if (($seed % 5) -eq 0) {
    $bg = "#130f18"
  } elseif (($seed % 3) -eq 0) {
    $bg = "#120c0d"
  }

  return @{
    skin = $skin
    robe = $robe
    accent = $accent
    glow = $glow
    bg = $bg
    line = "#101010"
    pale = "#d7d2c4"
  }
}

function Add-Rect {
  param(
    [System.Collections.Generic.List[string]]$List,
    [int]$X,
    [int]$Y,
    [int]$W,
    [int]$H,
    [string]$Fill
  )
  $List.Add("<rect x='$X' y='$Y' width='$W' height='$H' fill='$Fill' shape-rendering='crispEdges' />")
}

function New-PortraitSvg {
  param(
    [string]$Name,
    [string]$Rank,
    [string]$Appearance,
    [string]$OutputPath
  )

  $palette = Get-Palette -Rank $Rank -Appearance $Appearance -Name $Name
  $shapes = New-Object System.Collections.Generic.List[string]
  $lower = $Appearance.ToLowerInvariant()
  $seed = Get-SeedValue $Name

  $frame = @"
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96' width='96' height='96'>
  <rect width='96' height='96' fill='$($palette.bg)' />
  <rect x='4' y='4' width='88' height='88' rx='8' fill='#0d1612' stroke='#24312c' stroke-width='2' />
  <rect x='8' y='8' width='80' height='80' rx='6' fill='#101a16' />
  <rect x='8' y='8' width='80' height='80' rx='6' fill='url(#scan)' opacity='0.2' />
  <defs>
    <linearGradient id='scan' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='$($palette.glow)' stop-opacity='0.0' />
      <stop offset='50%' stop-color='$($palette.glow)' stop-opacity='0.7' />
      <stop offset='100%' stop-color='$($palette.glow)' stop-opacity='0.0' />
    </linearGradient>
  </defs>
"@

  Add-Rect $shapes 20 56 56 20 $palette.robe
  Add-Rect $shapes 28 44 40 16 $palette.skin
  Add-Rect $shapes 36 36 24 14 $palette.skin
  Add-Rect $shapes 38 40 4 4 $palette.line
  Add-Rect $shapes 54 40 4 4 $palette.line
  Add-Rect $shapes 44 46 8 2 $palette.line

  if ($Rank.ToLowerInvariant() -match 'king|prince') {
    Add-Rect $shapes 34 28 28 6 $palette.accent
    Add-Rect $shapes 38 24 6 6 $palette.accent
    Add-Rect $shapes 46 20 6 10 $palette.accent
    Add-Rect $shapes 54 24 6 6 $palette.accent
  } elseif ($Rank.ToLowerInvariant() -match 'duke|earl|marquis') {
    Add-Rect $shapes 34 30 28 4 $palette.accent
    Add-Rect $shapes 38 26 20 4 $palette.accent
  } else {
    Add-Rect $shapes 34 30 28 4 "#4f5a56"
  }

  if ($lower -match 'lion') {
    Add-Rect $shapes 30 34 8 18 "#6c4b26"
    Add-Rect $shapes 58 34 8 18 "#6c4b26"
    Add-Rect $shapes 34 32 28 8 "#7d542b"
  }
  if ($lower -match 'wolf|dog') {
    Add-Rect $shapes 34 28 6 8 $palette.skin
    Add-Rect $shapes 56 28 6 8 $palette.skin
    Add-Rect $shapes 32 34 4 10 $palette.skin
    Add-Rect $shapes 60 34 4 10 $palette.skin
  }
  if ($lower -match 'cat') {
    Add-Rect $shapes 36 28 4 8 $palette.skin
    Add-Rect $shapes 56 28 4 8 $palette.skin
  }
  if ($lower -match 'toad') {
    Add-Rect $shapes 28 50 12 8 "#55664d"
    Add-Rect $shapes 56 50 12 8 "#55664d"
  }
  if ($lower -match 'raven|bird|griffin|phoenix') {
    Add-Rect $shapes 24 40 10 18 "#4f5458"
    Add-Rect $shapes 62 40 10 18 "#4f5458"
    Add-Rect $shapes 48 44 10 4 "#d19b46"
  }
  if ($lower -match 'serpent') {
    Add-Rect $shapes 68 60 6 16 "#5d7c5b"
    Add-Rect $shapes 72 70 6 10 "#5d7c5b"
  }
  if ($lower -match 'fire|flame') {
    Add-Rect $shapes 26 16 8 8 "#ff8447"
    Add-Rect $shapes 62 16 8 8 "#ff8447"
    Add-Rect $shapes 46 12 6 8 "#ffb267"
  }
  if ($lower -match 'crocodill|horse|asse|dromedary|camel') {
    Add-Rect $shapes 18 68 60 10 "#3b423e"
    Add-Rect $shapes 22 62 14 8 "#4b554f"
    Add-Rect $shapes 64 62 8 14 "#4b554f"
  }
  if ($lower -match 'bull') {
    Add-Rect $shapes 28 30 8 4 "#c9c8d9"
    Add-Rect $shapes 60 30 8 4 "#c9c8d9"
  }
  if ($lower -match 'owl|stork') {
    Add-Rect $shapes 42 28 12 8 "#dad3c2"
  }
  if ($lower -match 'three heads|three-headed|three headed') {
    Add-Rect $shapes 24 36 12 12 $palette.skin
    Add-Rect $shapes 60 36 12 12 $palette.skin
  }
  if ($seed % 2 -eq 0) {
    Add-Rect $shapes 18 18 4 4 $palette.glow
    Add-Rect $shapes 74 18 4 4 $palette.glow
  }
  if ($seed % 3 -eq 0) {
    Add-Rect $shapes 16 78 64 2 $palette.accent
  }
  if ($seed % 5 -eq 0) {
    Add-Rect $shapes 46 58 4 18 $palette.accent
  }

  $footer = @"
  <rect x='10' y='72' width='76' height='12' fill='#0a0f0d' opacity='0.65' />
  <text x='48' y='81' text-anchor='middle' font-family='monospace' font-size='7' fill='$($palette.pale)'>$($Name.ToUpperInvariant())</text>
  <rect x='8' y='8' width='80' height='80' rx='6' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1' />
</svg>
"@

  Set-Content -Path $OutputPath -Value ($frame + ($shapes -join "`n") + "`n" + $footer) -Encoding utf8
}

$manifest = foreach ($line in ($manifestText.Trim() -split "`r?`n")) {
  $parts = $line.Split("|")
  [pscustomobject]@{
    number = [int]$parts[0]
    sourceId = $parts[1]
    name = $parts[2]
    aliases = @($parts[3].Split(",") | Where-Object { $_ -and $_ -ne $parts[2] })
  }
}

$html = Get-Content $sourceFile -Raw
$anchorMatches = [regex]::Matches($html, '<P id=(?<id>[a-z0-9_]+)>', 'IgnoreCase')
$orderedAnchors = New-Object System.Collections.Generic.List[object]
foreach ($match in $anchorMatches) {
  $id = $match.Groups["id"].Value
  if ($manifest.sourceId -notcontains $id) {
    continue
  }
  if ($orderedAnchors.Count -gt 0 -and $orderedAnchors[$orderedAnchors.Count - 1].id -eq $id) {
    continue
  }
  $orderedAnchors.Add([pscustomobject]@{
    id = $id
    index = $match.Index
  })
}

$entryMap = @{}
for ($index = 0; $index -lt $orderedAnchors.Count; $index += 1) {
  $current = $orderedAnchors[$index]
  $nextIndex = if ($index -lt $orderedAnchors.Count - 1) { $orderedAnchors[$index + 1].index } else { $html.Length }
  $segment = $html.Substring($current.index, $nextIndex - $current.index)
  $segment = $segment -replace "^(<P id=[^>]+>\s*)+", ""
  $bodyMatch = [regex]::Match(
    $segment,
    '^(?<body>.*?)(?=</TD>\s*<TD CLASS=NOTE|<P ALIGN=CENTER>|<DIV ALIGN=CENTER>|<CENTER>|<HR>)',
    'Singleline, IgnoreCase'
  )
  $imgMatch = [regex]::Match($segment, '<IMG SRC="(?<imgsrc>[^"]+)"', 'IgnoreCase')
  $entryMap[$current.id] = [pscustomobject]@{
    body = if ($bodyMatch.Success) { $bodyMatch.Groups["body"].Value } else { $segment }
    imgsrc = if ($imgMatch.Success) { $imgMatch.Groups["imgsrc"].Value } else { "" }
  }
}

$entries = New-Object System.Collections.Generic.List[object]

foreach ($item in $manifest) {
  if (-not $entryMap.ContainsKey($item.sourceId)) {
    throw "Missing source entry for $($item.sourceId)"
  }

  $source = $entryMap[$item.sourceId]
  $clean = Get-CleanText $source.body
  $rank = Extract-Rank $clean
  $legions = Extract-Legions $clean
  $appearance = Extract-Appearance $clean
  $offices = Extract-Offices -Text $clean -Appearance $appearance
  $tags = Build-Tags -Offices $offices -Appearance $appearance -Rank $rank
  $short = $clean
  if ($short.Length -gt 180) {
    $short = $short.Substring(0, 177).Trim() + "..."
  }

  $slug = "{0:d2}-{1}" -f $item.number, (($item.name.ToLowerInvariant() -replace '[^a-z0-9]+', '-') -replace '-+', '-').Trim('-')
  $sigilPath = ""
  if ($source.imgsrc) {
    $sigilExtension = [System.IO.Path]::GetExtension($source.imgsrc)
    if (-not $sigilExtension) {
      $sigilExtension = ".png"
    }
    $sigilTarget = Join-Path $sigilDir ($slug + $sigilExtension.ToLowerInvariant())
    if (-not (Test-Path $sigilTarget)) {
      $remote = if ($source.imgsrc.StartsWith("http")) { $source.imgsrc } else { "https://www.esotericarchives.com/solomon/" + $source.imgsrc.TrimStart("./".ToCharArray()) }
      curl.exe -k -s -L -A "Mozilla/5.0" $remote -o $sigilTarget
    }
    $sigilPath = "/assets/sigils/" + [System.IO.Path]::GetFileName($sigilTarget)
  }

  $portraitTarget = Join-Path $portraitDir ($slug + ".svg")
  New-PortraitSvg -Name $item.name -Rank $rank -Appearance $appearance -OutputPath $portraitTarget

  $variationNote = $null
  if ($item.aliases.Count -gt 0) {
    $variationNote = "Name variants in manuscripts and later editions include " + (($item.aliases | ForEach-Object { "'$_'" }) -join ", ") + "."
  }

  $entries.Add([ordered]@{
    id = ($item.name.ToLowerInvariant() -replace '[^a-z0-9]+', '-').Trim('-')
    goetiaNumber = $item.number
    name = $item.name
    rank = $rank
    legions = $legions
    title = $rank
    shortDescription = $short
    fullDescription = $clean
    appearance = if ($appearance) { $appearance } else { $null }
    offices = @($offices)
    specialties = @($tags)
    aliases = @($item.aliases)
    sigil = $sigilPath
    portraitAsset = "/assets/portraits/" + [System.IO.Path]::GetFileName($portraitTarget)
    tags = @($tags)
    notesOnVariations = $variationNote
    source = @{
      title = "Lemegeton, Part 1: Goetia"
      editor = "Joseph H. Peterson"
      url = $sourceUrl
    }
  })
}

$json = $entries | ConvertTo-Json -Depth 8
$json = $json -replace '"goetiaNumber":\s+(\d+)', '"goetiaNumber": $1'
$json = $json -replace '"legions":\s+(\d+)', '"legions": $1'

$tsContent = @"
import type { DemonEntry } from "../types/goetia";

export const goetiaEntries: DemonEntry[] = $json;

export const ranks = Array.from(new Set(goetiaEntries.map((entry) => entry.rank))).sort();
"@

Set-Content -Path (Join-Path $dataDir "goetiaEntries.ts") -Value $tsContent -Encoding utf8
