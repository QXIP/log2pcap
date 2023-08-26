<img src="https://github.com/sipcapture/homer7-docker/assets/1423657/36a8e515-ab0e-482b-bf49-2156e290c764" height=150>


# log2pcap
Generate PCAP files from Log Buffers &amp; Co

## Usage
```javascript
var pcapFile = log2pcap.encodePcap([
  {srcIp:"127.0.0.1", srcPort: 5060, dstIp: "127.0.0.2", dstPort: 5080, proto: 17, data: Buffer.from("HELLO")},
  {srcIp:"127.0.0.2", srcPort: 5080, dstIp: "127.0.0.1", dstPort: 5060, proto: 17, data: Buffer.from("WORLD")}
])
```

