# Write page.tsx
$tsx = Get-Content "d:\SahilThakur\Drholly\my-nextjs-app\app\page.tsx" -Raw
$tsx = $tsx -replace "<section className=\{styles.hero\}>", "<section className=\{styles.hero\}>`r`n        <div className=\{styles.heroSection\}>"
$tsx = $tsx -replace "(</div>\r`n\s*)(</section>\r`n\s*){2}({/ TRUST STRIP)", "$1        </div>`r`n      $2`r`n      $3"
Set-Content -Path "d:\SahilThakur\Drholly\my-nextjs-app\app\page.tsx" -Value $tsx -Encoding UTF8
