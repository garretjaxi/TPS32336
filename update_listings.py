#!/usr/bin/env python3
import csv
import os
import sys
from pathlib import Path

# Add the project root to the path
sys.path.insert(0, str(Path(__file__).parent))

# Read the CSV file
csv_file = "/home/ubuntu/upload/active_listings_export.csv"
listings_data = {}

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        name = row['Name'].strip()
        listings_data[name] = {
            'image_url': row['Image_URL'].strip(),
            'houfy_url': row['Houfy_URL'].strip(),
        }

print(f"Loaded {len(listings_data)} listings from CSV")
print("\nListings to update:")
for name, data in listings_data.items():
    print(f"  - {name}")
    print(f"    Image: {data['image_url'][:80]}...")
    print(f"    Houfy: {data['houfy_url']}")

# Generate SQL UPDATE statements
print("\n\nSQL UPDATE statements:")
print("=" * 80)

for name, data in listings_data.items():
    # Escape single quotes in the name
    escaped_name = name.replace("'", "''")
    escaped_image = data['image_url'].replace("'", "''")
    escaped_houfy = data['houfy_url'].replace("'", "''")
    
    sql = f"""UPDATE listings SET image = '{escaped_image}', houfy_url = '{escaped_houfy}' WHERE name = '{escaped_name}';"""
    print(sql)

print("\n" + "=" * 80)
print(f"Total updates: {len(listings_data)}")
