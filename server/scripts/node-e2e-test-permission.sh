tsx --permission \
  --allow-fs-read=* \
  --allow-fs-write=$(tsx -p 'os.tmpdir()') \
  --allow-child-process \
  --allow-worker \
  --allow-addons \
  --test ./test-helpers/main.e2e-spec.ts
