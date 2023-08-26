
# log2pcap
Generate PCAP files from Log Buffers &amp; Co

## Usage
```
var pcapFile = log2pcap.encodePcap([
  {srcIp:"127.0.0.1", srcPort: 5060, dstIp: "127.0.0.2", dstPort: 5080, proto: 17, data: Buffer.from("HELLO")},
  {srcIp:"127.0.0.2", srcPort: 5080, dstIp: "127.0.0.1", dstPort: 5060, proto: 17, data: Buffer.from("WORLD")}
])
```

