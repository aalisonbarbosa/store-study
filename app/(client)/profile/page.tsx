import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  const user = session.user;

  return (
    <>
      <h1 className="text-xl font-bold">Meu perfil</h1>

      <div className="bg-white h-96 flex flex-col justify-center gap-4 rounded-lg shadow px-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-200 flex items-center justify-center p-4 rounded-full">
            <User className="text-blue-700" size={64} />
          </div>
          <div className="">
            <h3 className="font-bold text-md capitalize">{user.name}</h3>
            <p className="text-sm text-stone-400">
              Cliente desde {user.createAt}
            </p>
          </div>
        </div>

        <form>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-stone-600">
                Nome Completo
              </label>
              <input
                type="text"
                className="border-2 border-stone-200 rounded-md py-2 px-4 focus:outline-blue-400"
                defaultValue={user.name!}
                id="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-stone-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border-2 border-stone-200 rounded-md py-2 px-4 focus:outline-blue-400"
                defaultValue={user.email!}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-stone-600">
                Nova Senha
              </label>
              <input
                type="password"
                id="password"
                className="border-2 border-stone-200 rounded-md py-2 px-4 focus:outline-blue-400"
                placeholder="Deixe em branco para manter atual"
              />
            </div>
          </div>

          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer">
            Salvar Alterações
          </button>
        </form>
      </div>
    </>
  );
}
