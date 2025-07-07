node --permission \
  --allow-fs-read=* \
  --allow-fs-write=$(tsx -p 'os.tmpdir()') \
  --allow-child-process \
  --allow-worker \
  --allow-addons \
  -r ts-node/register/transpile-only \
  -r tsconfig-paths/register \
  ./dist/src/infra/http/server.js \
  --env-file=.env
