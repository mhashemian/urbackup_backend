FROM ubuntu

RUN apt update -y && DEBIAN_FRONTEND=noninteractive apt install -y wget gcc g++ make git
RUN git clone https://github.com/mhashemian/urbackup_backend.git
WORKDIR urbackup_backend
RUN ./switch_build.sh server
RUN autoreconf --install
RUN ./configure
RUN make -j8
