const MyOrderLoading = () => {
  return (
    <div className="overflow-x-auto my-20 bg-white shadow rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-t border-gray-200">
              <td className="p-3">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="p-3 flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="p-3">
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="p-3">
                <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              </td>
              <td className="p-3">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MyOrderLoading;
