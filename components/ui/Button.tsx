"component client";
import { Button } from '@mantine/core';

export default function ButtonBase({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <Button component="a">{children}</Button>
  );
}