export const decodeHash = (hash: string | null) => {
    if (hash === null || hash === "") return []

    const hash_data = hash.slice(1);
    const data = hash_data.split('&').map((el:string) => ({
      owner: el.split('/')[0],
      name: el.split('/')[1]
    }));
    return data
}

export const decodeHashOrg = (hash: string | null) => {
  if (hash === null || hash === "") return []

  const hash_data = hash.slice(1);

  return hash_data.split('&')
}

export const dataToHash = (data: {owner: string, name: string}[]) => {
    const hash = data.map((el) => `${el.owner}/${el.name}`).join('&');
    return `#${hash}`;
}

export const dataToHashOrg = (data: string[]) => `#${data.join('&')}`;