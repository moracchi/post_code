// 郵便番号検索APIを利用
document.getElementById("search-btn").addEventListener("click", async () => {
  const zipcode = document.getElementById("zipcode").value.trim(); // 郵便番号取得
  const truck = document.getElementById("truck");
  const addressDisplay = document.getElementById("address");

  if (!zipcode || !/^\d{7}$/.test(zipcode)) {
    addressDisplay.textContent = "正しい郵便番号を入力してください（例: 1234567）。";
    addressDisplay.style.opacity = 1;
    return;
  }

  // 郵便車を走らせるアニメーション
  truck.style.transition = "all 2s ease-in-out";
  truck.style.right = "110%";

  try {
    // 郵便番号APIを呼び出して住所を取得
    const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`);
    const data = await response.json();

    if (data.results) {
      // 住所を組み立てる
      const result = data.results[0];
      const address = `${result.address1}${result.address2}${result.address3}`;
      setTimeout(() => {
        addressDisplay.textContent = `住所: ${address}`;
        addressDisplay.style.opacity = 1; // 住所を表示
        resetTruckAnimation(truck); // トラックアニメーションをリセット
      }, 2000);
    } else {
      setTimeout(() => {
        addressDisplay.textContent = "該当する住所が見つかりませんでした。";
        addressDisplay.style.opacity = 1;
        resetTruckAnimation(truck);
      }, 2000);
    }
  } catch (error) {
    setTimeout(() => {
      addressDisplay.textContent = "住所情報を取得できませんでした。再度お試しください。";
      addressDisplay.style.opacity = 1;
      resetTruckAnimation(truck);
    }, 2000);
  }
});

// 郵便車のアニメーションをリセットする関数
function resetTruckAnimation(truck) {
  setTimeout(() => {
    truck.style.transition = "none";
    truck.style.right = "-150px";
  }, 3000);
}
