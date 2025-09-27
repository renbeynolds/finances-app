type ConditionalWrapProps = {
  condition: boolean;
  wrap: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
};
export default function ConditionalWrap({
  condition,
  wrap,
  children,
}: ConditionalWrapProps) {
  return condition ? wrap(children) : children;
}
