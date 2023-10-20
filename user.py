

class User:
    def __init__(self, username: str, password: str, userId: int):
        self._username = username
        self._password = password
        self._userId = userId
        self._plugs = []

    def get_username(self):
        return self._username

    def get_password(self):
        return self._password

    def get_userId(self):
        return self._userId

    def get_plugs(self):
        return self._plugs

    def add_plug(self, plug):
        self._plugs.append(plug)

    def remove_plug(self, plug):
        self._plugs.remove(plug)

    def get_plug(self, index):
        return self._plugs[index]

    def get_plug(self, plugId):
        for plug in self._plugs:
            if plug.get_plugId() == plugId:
                return plug
        return None

