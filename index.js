/*
   log2pcap exporter
   (c) qxip bv 2023
*/

const ip = require('ip-packet');
const tcp = require('tcp-packet');
const udp = require('udp-packet');
const generator = require('pcap-generator');

function encodePcap(packetArray) {
  const pcapData = [];
  packetArray.forEach(packet => {
    // Create TCP or UDP packet
    let packet_data;
    if (packet.proto === 6) { // TCP
	packet_data = tcp.encode({
	  sourcePort: packet.srcPort,
	  destinationPort: packet.dstPort,
	  data: Buffer.from(packet.data)
	})
    } else if (packet.proto === 17) { // UDP
	packet_data = udp.encode({
	  sourcePort: packet.srcPort,
	  destinationPort: packet.dstPort,
	  data: Buffer.from(packet.data)
	})
    }
    let ipv4_packet = ip.encode({
      version: packet.version || 4,
      protocol: packet.proto,
      sourceIp: packet.srcIp,
      destinationIp: packet.dstIp,
      data: packet_data
    })
    // Combine IP and transport packets
    pcapData.push({
      timestamp: packet.ts || Date.now(),
      buffer: ipv4_packet
    });
  });
  // Generate the pcap file
  const pcapFileBuffer = generator(pcapData);
  return pcapFileBuffer;
}

module.exports = {
  encodePcap
};
