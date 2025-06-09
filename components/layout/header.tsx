interface HeaderPageProps {
    title: string;
}

export default function HeaderPage({ title }: HeaderPageProps) {
    return (
        <div className="w-full flex justify-between items-top md:items-center mb-2">
            <h1 className="text-2xl font-semibold text-[var(--header)]">{title}</h1>
            <img src="/logo-facema.svg" alt="logo facema" className="h-8 md:h-11" />
        </div>
    );
}