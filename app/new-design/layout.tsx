import NewHeader from "@/components/NewDesignComponents/NewHeader";
import "@/components/NewDesignComponents/new-site-styles.css";

export default function NewDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full bg-[var(--new-site-background-color)]">
        <NewHeader />
        {children}
      </main>
    </>
  );
}
