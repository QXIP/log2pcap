<img src="https://github.com/sipcapture/homer7-docker/assets/1423657/36a8e515-ab0e-482b-bf49-2156e290c764" height=150>

# log2pcap

Generate PCAP files from Log Buffers &amp; Co

## Usage



```javascript
const log2pcap = require("log2pcap");
var pcapFile = log2pcap.encodePcap([
    {
        srcIp: "127.0.0.1",
        srcPort: 5060,
        dstIp: "127.0.0.2",
        dstPort: 5080,
        proto: 17,
        data: Buffer.from("HELLO"),
    },
    {
        srcIp: "127.0.0.2",
        srcPort: 5080,
        dstIp: "127.0.0.1",
        dstPort: 5060,
        proto: 17,
        data: Buffer.from("WORLD"),
    },
]);
```
## Browser version

 _**Build bundle to import**_



```bash
# _This will generate the bundle to use at your browser application_
npm run build
```

From this **bundle** we could use two functions:

-   writePcap _that writes the object data into a ready to generate pcap data_

-   generator _that generates the pcap data into a blob_

-   after this generation we need to write a download function at browser.

### Sample usage (incluided at **index.html** file from this repo):

```js
// import bundle
<script src="bundle.js"></script>


// process data
<script>
  const bpc = require("browserPcap");


  // sample data object

  let pcapFile = [
      {
          srcIp: "127.0.0.1",
          srcPort: 5060,
          dstIp: "127.0.0.2",
          dstPort: 5080,
          proto: 17,
          data: "HELLO",
      },
      {
          srcIp: "127.0.0.2",
          srcPort: 5080,
          dstIp: "127.0.0.1",
          dstPort: 5060,
          proto: 17,
          data: "WORLD",
      },
  ];


  // (...)
  // input with id: file-name
  const file = document.getElementById("file-name");

  let fileName = file?.value;

  if ( fileName && typeof fileName === "string" && fileName !== "") {
    
      let pcap = bpc.writePcap(pcapFile);

      if (pcap) {
          let pcapData = bpc.generator(pcap);
          var a = document.getElementById("a");
          var blob = new Blob([pcapData], { type: "Buffer" });
          a.href = URL.createObjectURL(blob);
          a.download = fileName;
      }
  }

```



### Limitations

-   Only supports TCP (6) and UDP (17) protocols and IPv4
