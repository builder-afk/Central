with open("all_revert.patch") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "Features.tsx" in line:
        print("".join(lines[i:i+30]))
        break
