
export const githubRequest = async (path: string) : Promise<object> => {
    const response = await fetch(`https://api.github.com${path}`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
    });
    const data = await response.json();
    return data;
};
