import csv
import re
import json

data = []
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        period_str = row['period']
        # Extract era
        era_match = re.search(r'(Cretaceous|Jurassic|Triassic)', period_str)
        era = era_match.group(1) if era_match else "Unknown"
        
        # Extract MYA range
        mya_matches = re.findall(r'\d+', period_str)
        if mya_matches:
            mya_values = [int(m) for m in mya_matches]
            avg_mya = sum(mya_values) / len(mya_values)
        else:
            avg_mya = 0
            
        data.append({
            'name': row['name'],
            'diet': row['diet'],
            'era': era,
            'mya': avg_mya,
            'period': period_str,
            'lived_in': row['lived_in'],
            'type': row['type'],
            'length': row['length'],
            'taxonomy': row['taxonomy']
        })

# Sort by MYA descending (deeper is older)
data.sort(key=lambda x: x['mya'])

# Group by era
eras = {}
for d in data:
    if d['era'] not in eras:
        eras[d['era']] = {'min': d['mya'], 'max': d['mya'], 'count': 0}
    eras[d['era']]['min'] = min(eras[d['era']]['min'], d['mya'])
    eras[d['era']]['max'] = max(eras[d['era']]['max'], d['mya'])
    eras[d['era']]['count'] += 1

print(json.dumps({'eras': eras, 'total': len(data)}, indent=2))
