#!/bin/bash
# Image optimization script for Fast Origin Transfer reduction
# Converts existing images to WebP format for better compression

echo "Starting image optimization for Fast Origin Transfer reduction..."

# Function to optimize images in a directory
optimize_images() {
    local dir=$1
    local format=$2
    
    echo "Processing directory: $dir"
    
    for img in "$dir"/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
        if [[ -f "$img" ]]; then
            filename=$(basename -- "$img")
            extension="${filename##*.}"
            filename="${filename%.*}"
            
            # Skip if already optimized
            if [[ "$filename" == *"-optimized" ]]; then
                continue
            fi
            
            echo "Optimizing: $img"
            
            # Create WebP version for modern browsers
            sips -s format webp -s formatOptions 85 "$img" --out "$dir/${filename}.webp" 2>/dev/null
            
            # Create optimized JPEG version as fallback
            if [[ "$extension" == "png" || "$extension" == "PNG" ]]; then
                sips -s format jpeg -s formatOptions 85 "$img" --out "$dir/${filename}-optimized.jpg" 2>/dev/null
            else
                sips -s formatOptions 85 "$img" --out "$dir/${filename}-optimized.${extension}" 2>/dev/null
            fi
        fi
    done
}

# Optimize images in different directories
optimize_images "public/images/people" "webp"
optimize_images "public/images/landmarks" "webp"
optimize_images "public/images/resources" "webp" 2>/dev/null

echo "Image optimization complete!"
echo "Next steps:"
echo "1. Update your components to use Next.js Image component with priority and loading props"
echo "2. Consider lazy loading for images below the fold"
echo "3. Use appropriate sizing to avoid serving oversized images"