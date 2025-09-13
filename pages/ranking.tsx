import NavBar from "../components/NavBar";

export default function Ranking() {
  return (
    <div>
      <NavBar />
      <div className="p-6">
        <h2 className="text-2xl mb-4">Ranking</h2>
        <table className="min-w-full text-black bg-white rounded">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Punkte</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Anna</td>
              <td className="border px-4 py-2">50</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Ben</td>
              <td className="border px-4 py-2">40</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}