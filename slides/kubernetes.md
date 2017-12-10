![kubernetes logo](assets/kubernetes.png)

Open source container orchestration system,  
designed by Google.

Notes:
- Google has internally run for years an orchestration system codenamed Borg, which handles *billions* of containers.
- Kubernetes was made by most of the same people who worked on Borg, but it's a brand new project.
- Linux *cgroups* where designed and implemented by Google engineers in 2006.
- "kubernetes" is the greek word for "helmsman".
- The seven spokes of the helm logo are a reference to the original project codename "Seven", inspired by the Star Trek Voyager character Seven-of-Nine, who is a friendly Borg.
---

> The reason Google looks like it's up from the outside is that we see the world as collapsing around our ears on the inside, and write software to cope for that happening.

John Wilkes (Principal Software Engineer @ Google) <sup>[link][gcp-podcast]</sup>
  [gcp-podcast]: https://www.gcppodcast.com/post/episode-46-borg-and-k8s-with-john-wilkes/

---

### Design

- Written in Go
- API driven
- Portable, flexible, modular and extensible
- Configuration over convention
- Cluster centric

Notes:
- Borg was written in C++ instead.
- The API is fully transparent, there are no hidden internal details. This allows a very high degree of flexibility.
- Declarative interfaces are preferred over imperative.
- Cluster centric is intended as opposed to how Docker Swarm is designed, which scales out the workflow by starting from a single Docker host.

---

### Architecture

![kubernetes architecture](assets/kubernetes-architecture.png)

Notes:
- Master is a.k.a. the cluster control plane.
- Master components are usually all run on the same node, which is separated from worker nodes, but this is ultimately an implementation detail. Minikube, for example, runs everything on one single node.
- etcd is used as the central cluster data storage.
- There is also the `cloud-controller-manager` which interact with cloud specific details via dedicated controllers, when hosting Kubernetes on a cloud provider.
- Nodes are handled by the `Kubelet` agent
- `Kube-Proxy` handles the networking abstractions wrapping `Pods`.
- `cAdvisor` is a monitoring agent.
- Work is being done to allow self-hosting, i.e. running the Master components as Pods.
- HA deployments of the Master involve clustering etcd and load balancing the API server.

---

### Abstractions

- Node
- Pod
- Controller
- Volume
- Service
- Ingress

...and many others.

Notes:
- Pods are ephemeral.
- Containers inside a Pod are co-located and run in a shared context, e.g. they share IP address and IPC.
- Controllers provide a declarative approach to their workflow: the user declares a desired state, the controller ensures that state is present.
- There are many type of controllers: Deployment, ReplicaSet, DaemonSet, StatefulSet, Job.
- Services provide access to Pods, in spite these latter being ephemeral.
- Ingresses provide external access to services, featuring load balancing, SSL termination and name-based virtual hosting.

---

#### Example

```shell
$ kubectl create -f nginx-deployment.yml
```

```yaml
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

---

```bash
$ kubectl set image deployment/nginx-deployment nginx=nginx:1.9.1
deployment "nginx-deployment" image updated

$ kubectl scale deployment nginx-deployment --replicas=10
deployment "nginx-deployment" scaled

$ kubectl autoscale deployment nginx-deployment --min=10 --max=15 --cpu-percent=80
deployment "nginx-deployment" autoscaled

$ kubectl rollout undo deployment/nginx-deployment
deployment "nginx-deployment" rolled back

$ kubectl get deployments
NAME                 DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment     10        10        10           10          50s
```
