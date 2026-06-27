import json
import os

transcript_path = '/Users/kunalverma/.gemini/antigravity-ide/brain/ad23f9ee-865b-436a-9c61-40e703e7ba64/.system_generated/logs/transcript.jsonl'

diffs = []

with open(transcript_path, 'r') as f:
    for line in f:
        try:
            entry = json.loads(line)
            content = entry.get('content', '')
            if isinstance(content, str) and '[diff_block_start]' in content:
                start = content.find('[diff_block_start]') + len('[diff_block_start]')
                end = content.find('[diff_block_end]')
                diff = content[start:end].strip()
                # Find the filename from the text before [diff_block_start]
                text_before = content[:start]
                import re
                match = re.search(r'to: (.*?)\.', text_before)
                if match:
                    filename = match.group(1).strip()
                    diffs.append((filename, diff))
        except Exception as e:
            pass

# Write all diffs to a file
with open('all_revert.patch', 'w') as f:
    for filename, diff in diffs:
        # Construct proper unified diff header
        f.write(f"--- {filename}\n")
        f.write(f"+++ {filename}\n")
        f.write(diff + "\n\n")

print(f"Extracted {len(diffs)} diffs.")
