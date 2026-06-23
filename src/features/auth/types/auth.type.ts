const handleLogin = async () => {
  try {
    await loginUser({
      email,
      password,
    });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
