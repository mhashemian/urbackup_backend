FROM ubuntu

RUN apt clean
RUN apt update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y gcc g++ make git autoconf autoreconf
RUN git clone https://github.com/uroni/urbackup_backend
WORKDIR urbackup_backend
RUN ./switch_build.sh server
RUN autoreconf --install
RUN ./configure
RUN make -j8
