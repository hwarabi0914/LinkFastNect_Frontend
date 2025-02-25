"use client";
import { useRouter } from "next/navigation"; // ✅ 修正
import { useEffect, useState } from "react";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch customer");
    }
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default function ReadPage() {
  const router = useRouter();
  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null); // ✅ ルーターを useEffect 内で安全に使用

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const customerId = queryParams.get("customer_id");
    setId(customerId); // ✅ URL から直接 ID を取得
  }, []);

  useEffect(() => {
    if (id) {
      fetchCustomer(id)
        .then((data) => {
          if (data) {
            setCustomerInfo(data[0]);
          } else {
            setError("No customer found");
          }
        })
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!customerInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customerInfo} />
      </div>
      <button className="btn btn-outline btn-accent" onClick={() => router.push("/customers")}>
        一覧に戻る
      </button>
    </>
  );
}
