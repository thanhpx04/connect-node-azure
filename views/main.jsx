import React from "react";
import ForgeUI, { Button, Fragment, Text, Badge } from "@forge/ui";

export default function HelloWorld() {
  const [count, setCount] = React.useState(0);
  return (
    <Fragment>
      <Text>
        <Badge appearance="removed" text="-10" />
        <Badge appearance="added" text="+27" />
        <Badge appearance="primary" text="5K" />
      </Text>
      <Text>Current issue: {count}</Text>
      <Button
        text="Click"
        onClick={() => {
          setCount(count + 1);
        }}
      />
    </Fragment>
  );
}
