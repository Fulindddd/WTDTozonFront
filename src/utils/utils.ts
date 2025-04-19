import { validatenull } from './checkData';
import CryptoJS from 'crypto-js';
import { message } from 'antd';
import { parse, stringify } from 'qs';
import axioss, { AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';
import SparkMD5 from 'spark-md5';
import { mobileNoRegExp } from './RegExp';
import { RcFile } from 'antd/es/upload';

/**
 * 存储 storage
 * @name storage的key
 * @content storage的value
 * @type 是否是sessionStorage
 */
interface setStorageParams {
  name: string;
  content: any;
  type?: any;
}
export const setStorage = (params: setStorageParams): void => {
  const { name, content, type } = params;
  const obj = {
    dataType: typeof content,
    content,
    type,
    datetime: new Date().getTime(),
  };
  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj));
  else window.localStorage.setItem(name, JSON.stringify(obj));
};

/**
 * 获取 storage
 * @name storage的key
 * @type 是否是sessionStorage
 * @debug
 * return 添加时对应数据类型的值
 */
interface getStorageParams {
  name: string;
  type?: any;
  debug?: any;
}
export const getStorage = (params: getStorageParams): any => {
  const { name, type, debug } = params;
  let obj: any;
  let content: any;
  if (type) {
    obj = window.sessionStorage.getItem(name);
  } else {
    obj = window.localStorage.getItem(name);
  }
  if (validatenull(obj)) return null;
  try {
    obj = JSON.parse(obj);
  } catch {
    return obj;
  }
  if (debug) {
    return obj;
  }
  if (obj.dataType == 'string') {
    content = obj.content;
  } else if (obj.dataType == 'number') {
    content = Number(obj.content);
  } else if (obj.dataType == 'boolean') {
    content = eval(obj.content);
  } else if (obj.dataType == 'object') {
    content = obj.content;
  }
  return content;
};
export const getMD5 = (file: any) => {
  return new Promise((resolve, reject) => {
    const spark = new SparkMD5();
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = function readTo(e: any) {
      spark.appendBinary(e.target.result);
      try {
        const md5 = spark.end();
        resolve(md5);
      } catch (error) {
        reject(error);
      }
    };
  });
};
export type AlignType = 'center' | 'right' | 'left';

export const commonTableObj = (key: string) => {
  if (key.indexOf('time') > 0 || key.indexOf('Time') > 0) {
    return {
      key: key,
      ellipsis: true,
      align: 'center' as AlignType,
      dataIndex: key,
      width: 200,
    };
  } else {
    return {
      key: key,
      ellipsis: true,
      align: 'center' as AlignType,
      dataIndex: key,
      width: 150,
    };
  }
};
export const getTimeFormat = (time: any) => {
  let startTime = '';
  let endTime = '';
  if (time) {
    if (time[0]) {
      startTime = time[0].format('YYYY-MM-DD') + ' 00:00:00';
    }
    if (time[1]) {
      endTime = time[1].format('YYYY-MM-DD') + ' 23:59:59';
    }
    return [startTime, endTime];
  } else return ['', ''];
};

export const getResult = async (form: { validateFields: () => any }) => {
  try {
    const values = await form.validateFields();
    return values;
  } catch (err) {
    console.log(err);
  }
};
export const getToDayDate = () => {
  const currentDate = new Date();
  const currentMon = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
  const today = currentDate.getFullYear() + '-' + currentMon + '-' + currentDay;
  return today;
};
export const exportList = async (obj: any, path: string, method = 'POST', fileName = '导出列表') => {
  const token = getStorage({
    name: 'token',
  });
  // obj[conditionKey] = searchVal;
  const axiosInstance: AxiosInstance = axioss.create({
    baseURL: '/',
    timeout: 30000,
    responseType: 'blob',
  });

  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      if (token) {
        const newConfig = config;
        newConfig.headers.common.Authorization = token; // 将token放到请求头发送给服务器
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
  if (method === 'POST') {
    return await axiosInstance
      .post(`/hpdcApi/manager/${path}`, obj)
      .then((res) => {
        let blob = new Blob([res.data], {
          type: 'application/vnd.ms-excel', //将会被放入到blob中的数组内容的MIME类型
        });
        let objectUrl = URL.createObjectURL(blob); //生成一个url
        downloadFile(objectUrl, fileName);

        function downloadFile(content: any, filename: any) {
          let a = document.createElement('a');
          a.href = content;
          a.download = filename + '.xls';
          a.click();
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  } else {
    return await axiosInstance
      .get(`/hpdcApi/manager/${path}?${obj}`)
      .then((res) => {
        let blob = new Blob([res.data], {
          type: 'application/vnd.ms-excel', //将会被放入到blob中的数组内容的MIME类型
        });
        let objectUrl = URL.createObjectURL(blob); //生成一个url
        downloadFile(objectUrl, fileName);

        function downloadFile(content: any, filename: any) {
          let a = document.createElement('a');
          a.href = content;
          a.download = filename + '.xls';
          a.click();
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  }
};

/**
 * 删除 storage
 * @name storage的key
 * @type 是否是sessionStorage
 */
export const removeStorage = (params: { name: string; type?: any }) => {
  const { name, type } = params;
  if (type) {
    window.sessionStorage.removeItem(name);
  } else {
    window.localStorage.removeItem(name);
  }
};

export function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

export const checkedInput = (content: any[]) => {
  return content.map((item) => {
    const { context, type, msg } = item;
    if (type === 'check_null') {
      if (context === '' || new RegExp('^[ ]+$').test(context) || context === null || context === undefined) {
        message.warning(msg);
        return false;
      } else {
        return true;
      }
    } else if (type === 'check_tell') {
      if (context === '' || !/^1[3456789]\d{9}$/.test(context)) {
        // if(context === '' || !/1[3|4|5|7|8|9][0-9]\\d{8}/.test(context)){
        message.warning(msg);
        return false;
      } else {
        return true;
      }
    } else if (type === 'check_psw') {
      if (
        !(
          // /^[0-9|a-z|A-Z]{6,20}$/g.test(context) &&
          // /[0-9]/g.test(context) &&
          // /[a-z|A-Z]/g.test(context)
          /^(?!^[\d]+$)(?!^[a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(context)
        )
      ) {
        message.warning(msg);
        return false;
      } else {
        return true;
      }
    } else if (type === 'check_number') {
      if (!/^\d+$|^\d*\.\d+$/g.test(context)) {
        message.warning(msg);
        return false;
      }
    } else if (type === 'check_email') {
      if (!mobileNoRegExp.test(context)) {
        message.warning(msg);
        return false;
      }
    } else {
      return true;
    }
  });
};

export function getPlainNode(nodeList: any[], parentPath = '') {
  const arr: any[] = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

function getRelation(str1: string, str2: string) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes: string | any[]) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter((item) => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every((item) => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path: string, routerData: { [x: string]: any }) {
  let routes = Object.keys(routerData).filter((routePath) => routePath.indexOf(path) === 0 && routePath !== path);
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map((item) => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map((item) => {
    const exact = !routes.some((route) => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path: string) {
  return reg.test(path);
}

export const getQueryString = (name: any) => {
  const REG = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i'); // 匹配目标参数
  let paramsStr;
  if (window.location.href.indexOf('#') > -1) {
    paramsStr = window.location.href.split('?')[1];
    if (paramsStr && paramsStr.indexOf('#') > -1) {
      paramsStr = paramsStr.split('#')[0];
    }
  } else {
    paramsStr = window.location.search.substr(1);
  }
  if (!paramsStr) {
    return;
  }
  const result = paramsStr.match(REG); // 对querystring匹配目标参数
  if (result != null) {
    return decodeURIComponent(result[2]);
  }
  return null;
};

export const escape = (val: string) => {
  return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};
export const unescape = (val: string) => {
  return val
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
};
export const isPC = () => {
  const ua = navigator.userAgent.toLocaleLowerCase();
  if (ua.indexOf('iphone') > -1) return false;
  if (ua.indexOf('ipad') > -1) return false;
  if (ua.indexOf('ipod') > -1) return false;
  if (ua.indexOf('android') > -1) return false;
  if (ua.indexOf('windows phone') > -1) return false;
  if (ua.indexOf('symbianos') > -1) return false;

  return true;
};
export const uploadFiles = (url: string | undefined, filename: string) => {
  if (!url) return;
  const newUrl = url.replace('http:', 'https:');
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = newUrl;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const loadImages = (imageNodes: string | any[], getImg: (arg0: any) => any, callback: () => void) => {
  const loadArr = [];
  for (let i = 0; i < imageNodes.length; i++) {
    loadArr.push(getImg(imageNodes[i]));
  }
  Promise.all(loadArr).then((res) => {
    if (callback) {
      callback();
    }
  });
};

/**
 * 加密
 * @param str (string)
 * @returns string
 */
export const encryptByDES = (str: string) => {
  const keyHex = CryptoJS.enc.Utf8.parse('SupreIUM');
  const encrypted = CryptoJS.DES.encrypt(str, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
};
/**
 * 存储 storage
 * @name storage的key
 * @content storage的value
 * @type 是否是sessionStorage
 */
interface setStorageParams {
  name: string;
  content: any;
  type?: any;
}

/**
 * 获取 storage
 * @name storage的key
 * @type 是否是sessionStorage
 * @debug
 * return 添加时对应数据类型的值
 */
interface getStorageParams {
  name: string;
  type?: any;
  debug?: any;
}

export const encodeUTF8 = (s: string) => {
  var i,
    r = [],
    c,
    x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xc0 + ((c >> 6) & 0x1f), 0x80 + (c & 0x3f));
    else {
      if ((x = c ^ 0xd800) >> 10 == 0)
        //对四字节UTF-16转换为Unicode
        (c = (x << 10) + (s.charCodeAt(++i) ^ 0xdc00) + 0x10000),
          r.push(0xf0 + ((c >> 18) & 0x7), 0x80 + ((c >> 12) & 0x3f));
      else r.push(0xe0 + ((c >> 12) & 0xf));
      r.push(0x80 + ((c >> 6) & 0x3f), 0x80 + (c & 0x3f));
    }
  return r;
};

export const getTree = (data: any[], id: string | number = 0) => {
  let tree: any[] = []; //新建空数组
  //遍历每条数据
  data.map((item) => {
    //每条数据中的和parentId和传入的相同
    if (item.parentId == id) {
      //就去找这个元素的子集去  找到元素中parentId==item.id 这样层层递归
      item.children = getTree(data, item.id);
      if (item.children.length > 0) {
        item.selectable = false;
      }
      tree.push(item);
    }
  });
  return tree;
};

/**
 * Returns a truncated version of a string with an ellipsis in the middle if the string is longer than the specified maximum length.
 * @param filename - The string to be truncated.
 * @param maxLength - The maximum length of the truncated string.
 * @param ellipsisLength - The length of the ellipsis to be added to the truncated string.
 * @returns The truncated string with an ellipsis in the middle.
 */
export function ellipsisMiddle(filename: string, maxLength = 15, ellipsisLength = 3) {
  if (filename.length <= maxLength) {
    return filename;
  }

  const frontLength = Math.floor((maxLength - ellipsisLength) / 2);
  const backLength = maxLength - frontLength - ellipsisLength;

  return filename.slice(0, frontLength) + '...' + filename.slice(-backLength);
}

export function download(file: string, downloadName = ''): void {
  const a = document.createElement('a');
  a.href = file;
  a.download = downloadName;
  a.addEventListener('click', () => {
    console.log('下载完成');
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const beforeUploadFile_Image_Crop = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('请上传jpg、png格式的图片');
  }
  const isLt6M = file.size / 1024 / 1024 <= 5;
  if (!isLt6M) {
    message.error('图片大小不能超过5MB');
  }
  return isJpgOrPng && isLt6M;
};
export const beforeUploadFile_Image = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt6M = file.size / 1024 / 1024 <= 5;
  return isJpgOrPng && isLt6M;
};
