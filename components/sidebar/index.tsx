import NavLinks from "./nav-links";

interface IUser {
  name: string;
  role: "ADMIN" | "SELLER";
}

export default function SideBar({ user }: { user: IUser }) {
  return (
    <aside className="col-span-1 space-y-16 border-r-2 border-stone-200">
      <h1 className="font-bold text-2xl text-blue-700 pt-8 pl-8">
        Store Study
      </h1>

      <NavLinks user={user} />
    </aside>
  );
}
