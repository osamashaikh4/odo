import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Order } from "@/services/queries/order";
import moment from "moment";
import { PaymentMethodsMap } from "@/helpers";
import JsBarcode from "jsbarcode";

interface OrderDetailsDocumentProps {
  order: Order;
}

const OrderDetailsDocument = ({ order }: OrderDetailsDocumentProps) => {
  let canvas;

  canvas = document.createElement("canvas");
  JsBarcode(canvas, order.orderNumber);
  const barcode = canvas.toDataURL();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{ ...styles.center, margin: 10, padding: 10, flexGrow: 0.3 }}
        >
          <Text
            style={{ fontWeight: 600, textAlign: "center", fontSize: "10pt" }}
          >
            Order Details
          </Text>
          <Image src={barcode} style={{ width: 200, height: 200 }} />
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Order Number : {order.orderNumber}</Text>
          <Text style={styles.text}>
            Order Date : {moment(order.orderDate).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.text}>
            Payment : {PaymentMethodsMap[order.paymentMethod]}
          </Text>
          <Text style={styles.text}>
            Full Name : {order.customer.customerFirstName}{" "}
            {order.customer.customerLastName}
          </Text>
          <Text style={styles.text}>
            Telephone : {order.customer.customerPhone}
          </Text>
          <Text style={styles.text}>Address : {order.address.address}</Text>
          <View style={{ borderBottom: "1px solid #dee3e7" }}></View>
          <View style={{ marginTop: 26 }}>
            <Text
              style={{ fontSize: "10pt", marginBottom: 4, fontWeight: 600 }}
            >
              Order Items
            </Text>
            <View
              style={{
                border: "1px solid #dee3e7",
                borderBottom:
                  Array.isArray(order.items) && order.items.length > 0
                    ? "0px solid"
                    : "1px solid #dee3e7",
              }}
            >
              {Array.isArray(order.items) && order.items.length > 0 ? (
                <>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Name</Text>
                    <Text style={styles.tableCell}>SKU</Text>
                    <Text style={styles.tableCell}>Quantity</Text>
                    <Text style={styles.tableCell}>Total</Text>
                  </View>
                  {order.items.map((item) => (
                    <View style={styles.tableRow} key={item.orderItemID}>
                      <Text style={styles.tableCell}>{item.orderItemName}</Text>
                      <Text style={styles.tableCell}>
                        {item.orderItemSku || "-"}
                      </Text>
                      <Text style={styles.tableCell}>
                        {item.orderItemQuantity}
                      </Text>
                      <Text style={styles.tableCell}>
                        {item.orderItemTotal}
                      </Text>
                    </View>
                  ))}
                </>
              ) : null}
            </View>
          </View>
          <View
            style={{
              marginTop: 16,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexGrow: 1 }}></View>
            <View style={{ flexGrow: 0.5 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #dee3e7",
                  paddingBottom: 4,
                }}
              >
                <Text style={{ fontSize: "8pt" }}>Order Grand Total </Text>
                <Text style={{ fontSize: "8pt" }}>
                  {order.orderAmount} {order.orderCurrency}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OrderDetailsDocument;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: "9pt",
    marginBottom: 8,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #dee3e7",
    justifyContent: "space-between",
  },
  tableCell: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: "8pt",
    fontWeight: 500,
  },
});
