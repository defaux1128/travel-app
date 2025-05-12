// 在app.js文件顶部添加
const ALCHEMY_URL = "https://polygon-amoy.g.alchemy.com/v2/nP7PBQKi1MJpsoIdYVqvX5-rCAOb8cTF";

// 区块链连接函数
function connectToBlockchain() {
  // 方式1：通过用户钱包连接 
  if (window.ethereum) {
    // 用户有MetaMask时，通过它连接
    provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("通过用户钱包连接到区块链");
  } 
  // 方式2：直接连接（不依赖用户钱包）
  else {
    // 用户没有钱包时，使用Alchemy直接连接
    provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL);
    console.log("通过Alchemy直接连接到区块链");
  }
  
  return provider;
}

// 使用示例
async function showNFTCount() {
  // 建立连接
  const connection = connectToBlockchain();
  
  // 连接到您的合约
  const nftContract = new ethers.Contract(
    contractAddress,  // 您部署的合约地址
    contractABI,      // 合约接口
    connection        // 刚刚建立的连接
  );
  
  // 读取区块链数据
  const totalNFTs = await nftContract.totalSupply();
  
  // 显示数据
  console.log(`总共铸造了 ${totalNFTs} 个NFTs`);
}
// 合约地址和ABI
// 合约地址需要在部署后填写
const contractAddress = "0xb4f94C07Dabd77644B417cc36CD5A3167ea0eCdb";
// ABI需要从编译后的合约中获取
const contractABI = [
    {
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

// 全局变量
let userAccount = null;
let contract = null;
let userLocation = null;
let selectedFile = null;

// DOM元素
const connectButton = document.getElementById('connect-button');
const welcomeScreen = document.getElementById('welcome-screen');
const mainApp = document.getElementById('main-app');
const walletInfo = document.getElementById('wallet-info');
const createTab = document.getElementById('create-tab');
const collectionTab = document.getElementById('collection-tab');
const createForm = document.getElementById('create-form');
const collectionView = document.getElementById('collection-view');
const fileUpload = document.getElementById('file-upload');
const previewContainer = document.getElementById('preview-container');
const uploadContainer = document.getElementById('upload-container');
const previewImage = document.getElementById('preview-image');
const removeImageBtn = document.getElementById('remove-image');
const titleInput = document.getElementById('title');
const locationInput = document.getElementById('location');
const descriptionInput = document.getElementById('description');
const getLocationBtn = document.getElementById('get-location');
const locationCoords = document.getElementById('location-coords');
const mintButton = document.getElementById('mint-button');
const nftContainer = document.getElementById('nft-container');

// 初始化
window.addEventListener('DOMContentLoaded', () => {
  // 添加事件监听器
  connectButton.addEventListener('click', connectWallet);
  createTab.addEventListener('click', showCreateTab);
  collectionTab.addEventListener('click', showCollectionTab);
  fileUpload.addEventListener('change', handleFileUpload);
  removeImageBtn.addEventListener('click', removeImage);
  getLocationBtn.addEventListener('click', getCurrentLocation);
  mintButton.addEventListener('click', mintNFT);
  
  // 如果已连接钱包，立即显示主界面
  checkConnection();
});

// 检查是否已连接钱包
async function checkConnection() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        userAccount = accounts[0];
        await initializeContract();
        showMainApp();
      }
    } catch (error) {
      console.error("检查连接失败:", error);
    }
  }
}

// 连接钱包
// 对于ethers v5，连接钱包的代码应如下:
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      walletInfo.textContent = `${userAccount.substring(0, 6)}...${userAccount.substring(38)}`;
      
      // 使用ethers v5的方式初始化
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      // 加载NFT等操作...
      return true;
    } catch (error) {
      console.error("连接钱包失败:", error);
      alert("连接钱包失败: " + error.message);
      return false;
    }
  } else {
    alert("请安装MetaMask钱包");
    return false;
  }
}

// 初始化合约
async function initializeContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, contractABI, signer);
}

// 显示主应用界面
function showMainApp() {
  welcomeScreen.classList.add('hidden');
  mainApp.classList.remove('hidden');
}

// 切换到创建NFT标签
function showCreateTab() {
  createTab.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
  createTab.classList.remove('text-gray-500');
  collectionTab.classList.add('text-gray-500');
  collectionTab.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
  
  createForm.classList.remove('hidden');
  collectionView.classList.add('hidden');
}

// 切换到收藏标签
function showCollectionTab() {
  collectionTab.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
  collectionTab.classList.remove('text-gray-500');
  createTab.classList.add('text-gray-500');
  createTab.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
  
  createForm.classList.add('hidden');
  collectionView.classList.remove('hidden');
  
  // 刷新NFT列表
  loadUserNFTs();
}

// 处理文件上传
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImage.src = e.target.result;
      previewContainer.classList.remove('hidden');
      uploadContainer.classList.add('hidden');
    };
    reader.readAsDataURL(file);
  }
}

// 删除已选择的图片
function removeImage() {
  selectedFile = null;
  fileUpload.value = '';
  previewContainer.classList.add('hidden');
  uploadContainer.classList.remove('hidden');
}

// 获取当前位置
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        locationCoords.textContent = `纬度: ${userLocation.lat.toFixed(6)}, 经度: ${userLocation.lng.toFixed(6)}`;
      },
      function(error) {
        console.error("获取位置失败:", error);
        alert("无法获取您的位置: " + error.message);
      }
    );
  } else {
    alert("您的浏览器不支持地理定位");
  }
}

// 简单文件上传到IPFS (模拟)
async function uploadToIPFS(file) {
  // 在实际项目中，这里应连接到IPFS服务
  // 这里仅作模拟
  return "ipfs://QmSimulatedIPFSHash" + Math.floor(Math.random() * 1000000);
}

// 铸造NFT
// 获取当前铸造费用
async function getMintFee() {
  try {
    // 确保合约已初始化
    if (!contract) await initializeContract();
    
    // 调用合约获取铸造费用
    const fee = await contract.mintFee();
    return fee; // 这是一个BigNumber
  } catch (error) {
    console.error("获取铸造费用失败:", error);
    return ethers.utils.parseEther("0.01"); // 默认费用
  }
}

// 铸造NFT (更新后的函数)
async function mintNFT() {
  if (!selectedFile || !titleInput.value || !locationInput.value || !userLocation) {
    alert("请填写所有信息并上传图片");
    return;
  }
  
  try {
    mintButton.textContent = "处理中...";
    mintButton.disabled = true;
    
    // 1. 获取铸造费用
    const mintFee = await getMintFee();
    console.log("铸造费用:", ethers.utils.formatEther(mintFee), "MATIC");
    
    // 2. 上传图片 (真实项目中链接到IPFS)
    const imageUrl = await uploadToIPFS(selectedFile);
    
    // 3. 准备元数据
    const metadata = {
      name: titleInput.value,
      description: descriptionInput.value,
      image: imageUrl
    };
    
    // 4. 上传元数据
    const metadataUrl = await uploadToIPFS(JSON.stringify(metadata));
    
    // 5. 准备位置数据
    const locationData = JSON.stringify({
      name: locationInput.value,
      lat: userLocation.lat,
      lng: userLocation.lng
    });
    
    // 6. 调用合约铸造NFT (注意增加了value字段用于支付费用)
    const tx = await contract.mintNFT(
      userAccount, 
      metadataUrl, 
      locationData,
      { value: mintFee } // 支付费用
    );
    
    // 显示交易状态
    const txStatusDiv = document.createElement('div');
    txStatusDiv.className = 'bg-yellow-50 p-4 rounded-lg my-4';
    txStatusDiv.innerHTML = `
      <p class="text-yellow-700">交易已提交，正在等待确认...</p>
      <p class="text-sm text-yellow-600">交易哈希: ${tx.hash}</p>
    `;
    createForm.appendChild(txStatusDiv);
    
    // 等待交易确认
    await tx.wait();
    
    // 更新状态显示
    txStatusDiv.className = 'bg-green-50 p-4 rounded-lg my-4';
    txStatusDiv.innerHTML = `
      <p class="text-green-700">NFT铸造成功！已支付 ${ethers.utils.formatEther(mintFee)} MATIC</p>
      <p class="text-sm text-green-600">交易哈希: ${tx.hash}</p>
    `;
    
    // 5秒后移除状态显示
    setTimeout(() => {
      txStatusDiv.remove();
    }, 5000);
    
    // 重置表单
    resetForm();
    
    // 更新NFT列表
    showCollectionTab();
  } catch (error) {
    console.error("铸造NFT失败:", error);
    let errorMessage = error.message;
    
    // 检查是否是费用不足的错误
    if (errorMessage.includes("Insufficient payment")) {
      errorMessage = "支付的费用不足，请确保您有足够的MATIC";
    }
    
    alert("铸造NFT失败: " + errorMessage);
  } finally {
    mintButton.textContent = "铸造NFT";
    mintButton.disabled = false;
  }
}

// 显示铸造费用
async function displayMintFee() {
  const mintFeeElement = document.getElementById('mint-fee');
  try {
    const fee = await getMintFee();
    mintFeeElement.textContent = `${ethers.utils.formatEther(fee)} MATIC`;
  } catch (error) {
    mintFeeElement.textContent = "无法加载费用信息";
  }
}

// 在页面加载和钱包连接后调用
async function initializeApp() {
  if (userAccount) {
    await initializeContract();
    await displayMintFee();
    // ... 其他初始化操作
  }
}

// 重置表单
function resetForm() {
  removeImage();
  titleInput.value = '';
  locationInput.value = '';
  descriptionInput.value = '';
  userLocation = null;
  locationCoords.textContent = "未获取位置";
}

// 加载用户的NFT
async function loadUserNFTs() {
  if (!contract || !userAccount) return;
  
  try {
    // 清空NFT容器
    nftContainer.innerHTML = '<div class="text-center text-gray-500 py-12 col-span-full">加载中...</div>';
    
    // 获取用户NFT数量 (这里需要根据实际合约方法调整)
    // 注意：这里假设合约有balanceOf和tokenOfOwnerByIndex方法
    const balance = await contract.balanceOf(userAccount);
    
    if (balance == 0) {
      nftContainer.innerHTML = '<div class="text-center text-gray-500 py-12 col-span-full">还没有NFT，创建您的第一个旅行记忆</div>';
      return;
    }
    
    // 清空容器，准备添加NFT
    nftContainer.innerHTML = '';
    
    // 获取每个NFT的详情
    for (let i = 0; i < balance; i++) {
      // 获取tokenId (注意：根据您的合约调整)
      const tokenId = await contract.tokenOfOwnerByIndex(userAccount, i);
      
      // 获取元数据URI和位置数据
      const tokenURI = await contract.tokenURI(tokenId);
      const locationData = await contract.locationData(tokenId);
      
      // 这里只是模拟，实际应该从IPFS获取元数据
      // 为简化，我们创建一个基本卡片
      
      const nftCard = document.createElement('div');
      nftCard.className = 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-200';
      nftCard.innerHTML = `
        <div class="h-48 bg-gray-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-400" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-gray-800 text-lg">NFT #${tokenId}</h3>
          <div class="flex items-center mt-2 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            <span>${JSON.parse(locationData).name}</span>
          </div>
          <button class="mt-4 w-full py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition duration-200">
            查看详情
          </button>
        </div>
      `;
      
      nftContainer.appendChild(nftCard);
    }
  } catch (error) {
    console.error("加载NFT失败:", error);
    nftContainer.innerHTML = '<div class="text-center text-gray-500 py-12 col-span-full">加载NFT时出错</div>';
  }
}