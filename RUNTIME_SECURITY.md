# October 2026 runtime update

All Docker stages use `node:22.23.4-alpine3.23`, a supported Node 22 security release with updated embedded Mozilla roots. Alpine system trust separately requires `ca-certificates` and `ca-certificates-bundle >= 20261020-r0`. The build regenerates the system bundle and checks both stores for the emSign ECC Root CA G3 and AAA Certificate Services fingerprints. The AAA root permits the affected Sectigo cross-sign path. The vendor package retains unaffected emSign roots.

Alpine 3.23 uses `gcompat` for the dependency stage's glibc compatibility. Application dependencies and the lockfile stay unchanged.

Validation and release workflows also select Node 22.23.4. Validation uses the committed lockfile with `npm ci` and no longer injects a Sentry upload token into its build.

## Validation and rollout

- The existing lockfile installs on Node 22.23.4. The Next build passes with external sockets blocked and local Google font fixtures. Both compilation and type checks pass. The native standalone server returns HTTP 200 for the homepage with outgoing sockets blocked. These checks do not validate production integrations or real font downloads.
- The trust check is `node /usr/local/bin/check-ca-trust.cjs`. It runs in the common Docker base stage, including the production runner.
- Local Docker was unavailable during preparation. The Alpine image build and container runtime still require validation before rollout.
- Rebuild with `--pull --no-cache` in an approved environment. Verify Node's version, installed CA package versions, both trust stores, and application behavior before replacing running containers.
- This PR has not deployed or patched running containers. Merging to the deployment branch can publish an image and invoke the production hook.
- Check `NODE_EXTRA_CA_CERTS`, system CA options, mounted bundles, and application TLS overrides before deployment. Chains relying on removed trust anchors need replacement certificates.

## Primary sources

- [Node 22.23.4 security release](https://nodejs.org/en/blog/release/v22.23.4/)
- [Official Node image tags](https://github.com/docker-library/official-images/blob/master/library/node)
- [Alpine 3.23 CA package definition](https://github.com/alpinelinux/aports/blob/3.23-stable/main/ca-certificates/APKBUILD)
- [Mozilla incident response](https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/)
