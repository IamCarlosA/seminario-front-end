
```bash
  npm config set @ecommerce-ozon:registry https://gitlab.com/api/v4/projects/35700014/packages/npm/
```
```bash
  npm config set -- '//gitlab.com/api/v4/projects/35700014/packages/npm/:_authToken' "${GITLAB_ACCESS_TOKEN}"
```
```bash
  npm config set legacy-peer-deps true
  npm install
```
