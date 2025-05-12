// ======================
// 1. 全局变量和合约配置
// ======================

let userAccount = null; // 用户的钱包地址
let contract = null;    // 合约实例
let provider = null;    // 区块链提供者
let signer = null;      // 签名者

// 您部署的合约地址和ABI
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // 替换为您的合约地址
const contractABI = [ {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC721IncorrectOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC721InsufficientApproval",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidOperator",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC721NonexistentToken",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_fromTokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_toTokenId",
          "type": "uint256"
        }
      ],
      "name": "BatchMetadataUpdate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "MetadataUpdate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "locationData",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "uri",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        }
      ],
      "name": "mintNFT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
	];

// ======================
// 2. 初始化和事件监听
// ======================

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM加载完成，初始化应用...");
  
  // 获取元素引用
  const connectButton = document.getElementById('connect-button');
  const createTab = document.getElementById('create-tab');
  const collectionTab = document.getElementById('collection-tab');
  
  // 添加事件监听器
  if (connectButton) {
    connectButton.addEventListener('click', function() {
      console.log("连接按钮被点击");
      connectWallet();
    });
  }
  
  if (createTab) {
    createTab.addEventListener('click', showCreateTab);
  }
  
  if (collectionTab) {
    collectionTab.addEventListener('click', showCollectionTab);
  }
  
  // 检查是否已连接
  checkConnection();
});

// ======================
// 3. 钱包连接功能
// ======================

// 检查钱包是否已连接
async function checkConnection() {
  console.log("检查钱包连接状态...");
  
  // 检查MetaMask是否已安装
  if (!window.ethereum) {
    console.log("未检测到MetaMask");
    return;
  }
  
  try {
    // 查询已连接的账户（不会弹出MetaMask窗口）
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    
    if (accounts.length > 0) {
      console.log("发现已连接的账户:", accounts[0]);
      await handleAccountsChanged(accounts);
    } else {
      console.log("没有已连接的账户");
    }
    
    // 监听账户变化
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    
  } catch (error) {
    console.error("检查连接状态出错:", error);
  }
}

// 连接钱包主函数
async function connectWallet() {
  console.log("开始连接钱包...");
  
  // 检查MetaMask是否安装
  if (!window.ethereum) {
    console.error("MetaMask未安装");
    alert("请安装MetaMask钱包以使用本应用");
    return;
  }
  
  try {
    console.log("请求用户授权...");
    // 请求用户授权连接（会弹出MetaMask窗口）
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    console.log("用户授权成功, 账户:", accounts);
    await handleAccountsChanged(accounts);
    
  } catch (error) {
    console.error("连接钱包失败:", error);
    
    // 更友好的错误提示
    if (error.code === 4001) {
      alert("您拒绝了连接请求。要使用本应用，需要连接钱包。");
    } else {
      alert("连接钱包时出错: " + error.message);
    }
  }
}

// 处理账户变化
async function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    console.log("用户断开了所有账户");
    disconnectWallet();
    return;
  }
  
  // 保存当前账户
  userAccount = accounts[0];
  console.log("当前活跃账户:", userAccount);
  
  // 初始化提供者和签名者
  await initializeProvider();
  
  // 显示主界面
  showMainApp();
  
  // 加载用户NFT
  await loadUserNFTs();
}

// 初始化区块链提供者和合约
async function initializeProvider() {
  console.log("初始化区块链提供者...");
  
  try {
    // 创建ethers的Web3Provider
    provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("提供者初始化成功");
    
    // 获取签名者（交易发送者）
    signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    console.log("签名者地址:", signerAddress);
    
    // 初始化合约实例
    contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    console.log("合约初始化成功");
    
    // 获取合约信息（可选，用于验证合约连接）
    const name = await contract.name();
    console.log("NFT名称:", name);
    
    return true;
  } catch (error) {
    console.error("初始化提供者出错:", error);
    alert("与区块链连接失败: " + error.message);
    return false;
  }
}

// 断开钱包连接
function disconnectWallet() {
  userAccount = null;
  provider = null;
  signer = null;
  contract = null;
  
  // 显示欢迎屏幕
  document.getElementById('welcome-screen').classList.remove('hidden');
  document.getElementById('main-app').classList.add('hidden');
  
  console.log("已断开钱包连接");
}

// 显示主应用界面
function showMainApp() {
  // 更新钱包信息显示
  const walletInfo = document.getElementById('wallet-info');
  if (walletInfo) {
    walletInfo.textContent = `${userAccount.substring(0, 6)}...${userAccount.substring(38)}`;
  }
  
  // 切换界面
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
  
  console.log("已显示主应用界面");
}

// ======================
// 4. 标签页切换功能
// ======================

// 显示创建NFT标签页
function showCreateTab() {
  document.getElementById('create-tab').classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
  document.getElementById('create-tab').classList.remove('text-gray-500');
  document.getElementById('collection-tab').classList.add('text-gray-500');
  document.getElementById('collection-tab').classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
  
  document.getElementById('create-form').classList.remove('hidden');
  document.getElementById('collection-view').classList.add('hidden');
  
  console.log("显示创建NFT标签页");
}

// 显示NFT集合标签页
function showCollectionTab() {
  document.getElementById('collection-tab').classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
  document.getElementById('collection-tab').classList.remove('text-gray-500');
  document.getElementById('create-tab').classList.add('text-gray-500');
  document.getElementById('create-tab').classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
  
  document.getElementById('create-form').classList.add('hidden');
  document.getElementById('collection-view').classList.remove('hidden');
  
  // 重新加载NFT列表
  loadUserNFTs();
  
  console.log("显示NFT集合标签页");
}

// ======================
// 5. NFT铸造相关功能
// ======================

// 全局变量
let selectedFile = null;
let userLocation = null;

// 处理文件上传
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile = file;
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const previewImage = document.getElementById('preview-image');
      previewImage.src = e.target.result;
      
      document.getElementById('preview-container').classList.remove('hidden');
      document.getElementById('upload-container').classList.add('hidden');
    };
    
    reader.readAsDataURL(file);
    console.log("文件已上传:", file.name);
  }
}

// 移除已选择的文件
function removeImage() {
  selectedFile = null;
  document.getElementById('file-upload').value = '';
  document.getElementById('preview-container').classList.add('hidden');
  document.getElementById('upload-container').classList.remove('hidden');
  
  console.log("已移除文件");
}

// 获取当前地理位置
function getCurrentLocation() {
  if (navigator.geolocation) {
    console.log("请求获取地理位置...");
    
    navigator.geolocation.getCurrentPosition(
      // 成功回调
      function(position) {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        document.getElementById('location-coords').textContent = 
          `纬度: ${userLocation.lat.toFixed(6)}, 经度: ${userLocation.lng.toFixed(6)}`;
        
        console.log("获取地理位置成功:", userLocation);
      },
      // 错误回调
      function(error) {
        console.error("获取地理位置失败:", error);
        
        let errorMsg = "无法获取您的位置: ";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMsg += "用户拒绝了位置请求";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg += "位置信息不可用";
            break;
          case error.TIMEOUT:
            errorMsg += "请求超时";
            break;
          default:
            errorMsg += error.message;
        }
        
        alert(errorMsg);
      },
      // 选项
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  } else {
    console.error("您的浏览器不支持地理定位");
    alert("您的浏览器不支持地理定位功能");
  }
}

// 上传到IPFS（示例实现）
async function uploadToIPFS(file) {
  console.log("上传文件到IPFS...");
  
  // 实际项目中，这里应该使用真实的IPFS服务
  // 这里仅作为示例，模拟上传过程
  return new Promise((resolve) => {
    setTimeout(() => {
      // 返回模拟的IPFS哈希
      const hash = "ipfs://" + Math.random().toString(36).substring(2, 15);
      console.log("文件上传成功，IPFS哈希:", hash);
      resolve(hash);
    }, 1000);
  });
}

// 铸造NFT
async function mintNFT() {
  console.log("开始铸造NFT...");
  
  // 获取表单数据
  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('description').value;
  
  // 验证表单
  if (!selectedFile || !title || !location || !userLocation) {
    alert("请填写所有信息并上传图片");
    return;
  }
  
  // 禁用铸造按钮并显示加载状态
  const mintButton = document.getElementById('mint-button');
  const originalButtonText = mintButton.textContent;
  mintButton.disabled = true;
  mintButton.textContent = "铸造中...";
  
  try {
    // 1. 上传图片到IPFS
    console.log("上传图片...");
    const imageUrl = await uploadToIPFS(selectedFile);
    
    // 2. 准备元数据
    const metadata = {
      name: title,
      description: description,
      image: imageUrl,
      attributes: [
        { trait_type: "Location", value: location },
        { trait_type: "Latitude", value: userLocation.lat.toString() },
        { trait_type: "Longitude", value: userLocation.lng.toString() }
      ]
    };
    
    // 3. 上传元数据到IPFS
    console.log("上传元数据...");
    const metadataUrl = await uploadToIPFS(JSON.stringify(metadata));
    
    // 4. 准备位置数据
    const locationData = JSON.stringify({
      name: location,
      lat: userLocation.lat,
      lng: userLocation.lng
    });
    
    // 5. 获取铸造费用（如果合约需要）
    let mintFee = null;
    try {
      if (contract.mintFee) {
        mintFee = await contract.mintFee();
        console.log("铸造费用:", ethers.utils.formatEther(mintFee), "ETH");
      }
    } catch (error) {
      console.log("合约没有mintFee函数或获取失败");
    }
    
    // 6. 调用合约铸造NFT
    console.log("调用合约铸造NFT...");
    let tx;
    
    // 根据合约函数参数和是否需要费用调用不同的方法
    if (mintFee) {
      tx = await contract.mintNFT(
        userAccount,
        metadataUrl,
        locationData,
        { value: mintFee }
      );
    } else {
      tx = await contract.mintNFT(
        userAccount,
        metadataUrl,
        locationData
      );
    }
    
    // 7. 显示交易状态
    console.log("交易已提交，哈希:", tx.hash);
    
    // 创建状态提示
    const statusDiv = document.createElement('div');
    statusDiv.className = 'bg-yellow-50 p-4 rounded-lg my-4';
    statusDiv.innerHTML = `
      <p class="text-yellow-700">交易已提交，等待确认...</p>
      <p class="text-sm text-yellow-600">交易哈希: ${tx.hash}</p>
    `;
    
    document.getElementById('create-form').appendChild(statusDiv);
    
    // 8. 等待交易确认
    console.log("等待交易确认...");
    const receipt = await tx.wait();
    console.log("交易已确认，收据:", receipt);
    
    // 9. 更新状态提示
    statusDiv.className = 'bg-green-50 p-4 rounded-lg my-4';
    statusDiv.innerHTML = `
      <p class="text-green-700">NFT铸造成功！</p>
      <p class="text-sm text-green-600">交易哈希: ${tx.hash}</p>
      <p class="text-sm text-green-600">区块号: ${receipt.blockNumber}</p>
    `;
    
    // 10. 重置表单
    setTimeout(() => {
      resetForm();
      statusDiv.remove();
      
      // 切换到收藏页面显示新铸造的NFT
      showCollectionTab();
    }, 5000);
    
    alert("NFT铸造成功！");
    
  } catch (error) {
    console.error("铸造NFT失败:", error);
    
    let errorMessage = "铸造NFT失败";
    
    // 提供更友好的错误信息
    if (error.code === 4001) {
      errorMessage = "您取消了交易";
    } else if (error.code === -32603) {
      errorMessage = "交易失败，可能是gas费不足";
    } else if (error.message.includes("insufficient funds")) {
      errorMessage = "余额不足，无法支付交易费用";
    } else {
      errorMessage += ": " + error.message;
    }
    
    alert(errorMessage);
  } finally {
    // 无论成功失败，恢复按钮状态
    mintButton.disabled = false;
    mintButton.textContent = originalButtonText;
  }
}

// 重置表单
function resetForm() {
  // 重置文件上传
  removeImage();
  
  // 重置表单字段
  document.getElementById('title').value = '';
  document.getElementById('location').value = '';
  document.getElementById('description').value = '';
  
  // 重置位置信息
  userLocation = null;
  document.getElementById('location-coords').textContent = "未获取位置";
  
  console.log("表单已重置");
}

// ======================
// 6. 加载用户NFT
// ======================

// 加载用户的NFT
async function loadUserNFTs() {
  console.log("开始加载用户NFT...");
  
  if (!contract || !userAccount) {
    console.error("合约或用户账户未初始化");
    return;
  }
  
  const nftContainer = document.getElementById('nft-container');
  
  // 显示加载状态
  nftContainer.innerHTML = '<div class="text-center text-gray-500 py-12 col-span-full">加载中...</div>';
  
  try {
    // 获取用户拥有的NFT数量
    // 注意：您需要根据合约实际函数调整这部分代码
    console.log("获取用户NFT数量...");
    
    // 假设合约有balanceOf方法
    const balance = await contract.balanceOf(userAccount);
    const nftCount = balance.toNumber();
    
    console.log(`用户拥有 ${nftCount} 个NFT`);
    
    if (nftCount === 0) {
      nftContainer.innerHTML = '<div class="text-center text-gray-500 py-12 col-span-full">您还没有NFT，创建您的第一个旅行记忆！</div>';
      return;
    }
    
    // 清空容器准备添加NFT
    nftContainer.innerHTML = '';
    
    // 获取每个NFT详情
    console.log("获取NFT详情...");
    for (let i = 0; i < nftCount; i++) {
      try {
        // 获取tokenId（假设合约有tokenOfOwnerByIndex方法）
        const tokenId = await contract.tokenOfOwnerByIndex(userAccount, i);
        
        // 获取tokenURI和位置数据
        const tokenURI = await contract.tokenURI(tokenId);
        const locationData = await contract.locationData(tokenId);
        
        console.log(`NFT #${tokenId} URI:`, tokenURI);
        
        // 处理IPFS URI（示例）
        let metadataUrl = tokenURI;
        if (tokenURI.startsWith('ipfs://')) {
          // 在真实应用中，应该使用IPFS网关
          metadataUrl = 'https://ipfs.io/ipfs/' + tokenURI.slice(7);
        }
        
        // 获取元数据（在真实应用中，这应该从IPFS获取）
        let metadata = {
          name: `NFT #${tokenId}`,
          description: "加载中...",
          image: "/api/placeholder/400/320"
        };
        
        try {
          // 模拟获取元数据（实际应用需要真实获取）
          // const response = await fetch(metadataUrl);
          // metadata = await response.json();
        } catch (metadataError) {
          console.error(`获取NFT #${tokenId}元数据失败:`, metadataError);
        }
        
        // 解析位置数据
        let location = { name: "未知位置" };
        try {
          location = JSON.parse(locationData);
        } catch (locError) {
          console.error(`解析NFT #${tokenId}位置失败:`, locError);
        }
        
        // 创建NFT卡片
        const nftCard = document.createElement('div');
        nftCard.className = 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-200';
        nftCard.innerHTML = `
          <div class="h-48 bg-gray-200 flex items-center justify-center">
            <img src="${metadata.image}" alt="${metadata.name}" class="w-full h-full object-cover" onerror="this.src='/api/placeholder/400/320'"/>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-800 text-lg">${metadata.name}</h3>
            <div class="flex items-center mt-2 text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              <span>${location.name}</span>
            </div>
            <button 
              class="mt-4 w-full py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition duration-200"
              onclick="viewNFTDetails(${tokenId})"
            >
              查看详情
            </button>
          </div>
        `;
        
        nftContainer.appendChild(nftCard);
      } catch (nftError) {
        console.error(`处理NFT #${i}时出错:`, nftError);
      }
    }
    
  } catch (error) {
    console.error("加载NFT失败:", error);
    nftContainer.innerHTML = '<div class="text-center text-gray-500 py-12 col-span-full">加载NFT时出错</div>';
  }
}

// 查看NFT详情（示例函数）
function viewNFTDetails(tokenId) {
  alert(`查看NFT #${tokenId}的详情（功能开发中）`);
}