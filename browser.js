/*
   log2pcap exporter
   (c) qxip bv 2023
*/

const ip = require("ip-packet");
const tcp = require("tcp-packet");
const udp = require("udp-packet");
const { configure } = require("pcap-generator");

const generator = configure({ Buffer: Buffer });

function checkPacketData(packet) {
    return typeof packet.data === "string"
        ? Buffer.from(packet.data)
        : Buffer.from("");
}

function protoEncode(proto, packet, bufferData) {
    return proto.encode({
        sourcePort: packet.srcPort,
        destinationPort: packet.dstPort,
        data: Buffer.from(bufferData),
    });
}

function ipEncode(packet, packet_data) {
    return ip.encode({
        version: packet.version || 4,
        protocol: packet.proto,
        sourceIp: packet.srcIp,
        destinationIp: packet.dstIp,
        data: packet_data,
    });
}

function processPacketData(packet) {
    const bufferData = checkPacketData(packet);

    if (packet.proto === 6) {
        // TCP
        return protoEncode(tcp, packet, bufferData);
    } else if (packet.proto === 17) {
        // UDP
        return protoEncode(udp, packet, bufferData);
    }
}

function encodePcap(packetArray) {
    const pcapData = [];
    packetArray.forEach((packet) => {
        const packet_data = processPacketData(packet);
        const ipv4_packet = ipEncode(packet, packet_data);
        pcapData.push({
            timestamp: packet.ts || Date.now(),
            buffer: ipv4_packet,
        });
    });

    return pcapData;
}

function writePcap(file) {
    try {
        const pcapFile = encodePcap(file);
        return pcapFile;
    } catch (e) {
        console.log("Error on writing PCAP file");
    }
}

module.exports = {
    writePcap,
    generator,
};
