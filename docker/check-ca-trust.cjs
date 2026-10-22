const { X509Certificate } = require('node:crypto');
const { readFileSync } = require('node:fs');
const { rootCertificates } = require('node:tls');

// Check both stores. Removing only the emSign root leaves the AAA cross-sign path.
const blocked = new Set([
  '86A1ECBA089C4A8D3BBE2734C612BA341D813E043CF9E8A862CD5C57A36BBE6B',
  'D7A7A0FB5D7E2731D771E9484EBCDEF71D5F0C3E0A2948782BC83EE0EA699EF4',
]);
const bundle = readFileSync(process.argv[2] || '/etc/ssl/certs/ca-certificates.crt', 'utf8');
const systemCertificates = bundle.match(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g);
if (!systemCertificates?.length) throw new Error('System CA bundle is empty or invalid');

for (const pem of [...rootCertificates, ...systemCertificates]) {
  const certificate = new X509Certificate(pem);
  if (blocked.has(certificate.fingerprint256.replaceAll(':', ''))) {
    throw new Error('Distrusted certificate in Node or system CA bundle');
  }
}
console.log('Node and system CA bundles exclude emSign ECC G3 and AAA Certificate Services.');
