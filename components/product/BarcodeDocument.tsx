import React from "react";
import { Page, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import JsBarcode from "jsbarcode";

interface BarcodeDocument {
  barcode: string;
}

Font.register({
  family: "Arabic",
  src: "/assets/fonts/arabic.ttf",
});

const BarcodeDocument = ({ barcode: code }: BarcodeDocument) => {
  let canvas;

  canvas = document.createElement("canvas");
  JsBarcode(canvas, code);
  const barcode = canvas.toDataURL();

  return (
    <Page size={{ width: "100mm", height: "50mm" }} style={styles.page}>
      <View
        style={{
          ...styles.center,
          marginTop: 25,
        }}
      >
        <Image src={barcode} style={{ width: 150, height: 100 }} />
      </View>
    </Page>
  );
};

export default BarcodeDocument;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Arabic",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
