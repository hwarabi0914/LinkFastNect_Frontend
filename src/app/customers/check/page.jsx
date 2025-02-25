"use client";
import { useRouter } from "next/router";
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
  const { id } = router.query;
  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState(null);

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
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}
