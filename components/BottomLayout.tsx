import Container from "@/components/Container";

export default function BottomLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex-1 py-6">
      <Container size="md">{children}</Container>
    </div>
  );
}
