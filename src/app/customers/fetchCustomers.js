export default async function fetchCustomers() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/allcustomers", {
    cache: "no-cache",
  });
  console.log("API Response Status:", res.status); // 追加

  if (!res.ok) {
    throw new Error("Failed to fetch customers");
  }

  const data = await res.json();
  console.log("Fetched Customers Data:", data); // 追加
  return data;
}
