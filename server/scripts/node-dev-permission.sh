tsx --permission \
  --allow-fs-read=* \
  --allow-fs-write=$(tsx -p 'os.tmpdir()') \
  --allow-child-process \
  --allow-worker \
  --allow-addons \
  --watch ./src/infra/http/server.ts \
  --env-file=.env
