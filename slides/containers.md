## Linux Containers

OS-level virtualization

![virtualization-vs-containers](assets/virtualization-vs-containers.png)

---

## Why containers?

- Packaging
- Isolation
- Control

---

## How do they work?

Kernel capabilities
- *Union mounts* to merge multiple files systems w/ copy on write
- *Namespaces* to isolate the environment
- *cgroups* to control resource usage

Notes:
- Union mount drivers: UnionFS, AUFS, Overlay2
- Namespaces: msn, pid, network, user, ipc, uts, cgroup
- Namespaces and cgroups are heavily related. They rely on specific system calls and the /sys/fs virtual file system
- Containers are opaque from the inside

---

It's a glorified chroot  

![troll-face](assets/trollface.jpg)

Notes:
Wikipedia actually lists `chroot` as a os-level virtualization implementation.

---

### Containers != Docker

- LXC/LXD <sup>[1]</sup>
- rkt <sup>[2]</sup>
- containerd <sup>[3]</sup>
- OpenVZ <sup>[4]</sup>

  [1]: https://linuxcontainers.org
  [2]: https://coreos.com/rkt
  [3]: https://containerd.io
  [4]: https://openvz.org

---

### Standardization efforts

[Open Container Initiative](https://www.opencontainers.org)  
[Cloud Native Computing Foundation](https://www.cncf.io)
