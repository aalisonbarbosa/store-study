export function ProductsTableSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="overflow-hidden rounded-xl border border-stone-200">
        <table className="w-full border-collapse">
          <thead className="bg-stone-100">
            <tr>
              {["Produto", "Preço", "Status", "Vendedor", "Ações"].map(
                (header, i) => (
                  <th
                    key={i}
                    className="p-3 text-left uppercase font-medium text-stone-500"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="p-3 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-200" />
                  <div className="flex flex-col gap-4">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                    <div className="h-4 w-32 rounded bg-gray-200" />
                  </div>
                </td>
                <td className="p-3">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </td>
                <td className="p-3">
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </td>
                <td className="p-3">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-10 rounded bg-gray-200" />
                    <div className="h-4 w-10 rounded bg-gray-200" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
